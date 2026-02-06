import {
    Connection,
    Keypair,
    SystemProgram,
    Transaction,
    PublicKey,
    sendAndConfirmTransaction
} from '@solana/web3.js';
import {
    createInitializeMintInstruction,
    TOKEN_PROGRAM_ID,
    MINT_SIZE,
    getMinimumBalanceForRentExemptMint,
    createAssociatedTokenAccountInstruction,
    getAssociatedTokenAddress,
    createMintToInstruction
} from '@solana/spl-token';
import {
    createCreateMetadataAccountV3Instruction,
    PROGRAM_ID as METADATA_PROGRAM_ID
} from '@metaplex-foundation/mpl-token-metadata';

export interface TokenMetadata {
    name: string;
    symbol: string;
    description: string;
    image: string; // This should be an uploaded URL (IPFS/Arweave)
}

export async function createToken(
    connection: Connection,
    payer: PublicKey,
    signTransaction: (transaction: Transaction) => Promise<Transaction>,
    metadata: TokenMetadata
) {
    // 1. Generate a new Keypair for the Mint
    const mintKeypair = Keypair.generate();
    const mint = mintKeypair.publicKey;

    // 2. Get Rent Exemption
    const lamports = await getMinimumBalanceForRentExemptMint(connection);

    // 3. Create Transaction
    const transaction = new Transaction();

    // 4. Add Instruction: Create Mint Account
    transaction.add(
        SystemProgram.createAccount({
            fromPubkey: payer,
            newAccountPubkey: mint,
            space: MINT_SIZE,
            lamports,
            programId: TOKEN_PROGRAM_ID,
        })
    );

    // 5. Add Instruction: Initialize Mint
    transaction.add(
        createInitializeMintInstruction(
            mint,
            9, // Decimals
            payer, // Mint Authority
            payer, // Freeze Authority
            TOKEN_PROGRAM_ID
        )
    );

    // 6. Add Instruction: Create Metadata Account
    const [metadataAddress] = PublicKey.findProgramAddressSync(
        [
            Buffer.from("metadata"),
            METADATA_PROGRAM_ID.toBuffer(),
            mint.toBuffer(),
        ],
        METADATA_PROGRAM_ID
    );

    const onChainData = {
        name: metadata.name,
        symbol: metadata.symbol,
        uri: metadata.image, // In a real app, this should be a JSON URI uploaded to Arweave
        sellerFeeBasisPoints: 0,
        creators: null,
        collection: null,
        uses: null,
    };

    transaction.add(
        createCreateMetadataAccountV3Instruction(
            {
                metadata: metadataAddress,
                mint: mint,
                mintAuthority: payer,
                payer: payer,
                updateAuthority: payer,
            },
            {
                createMetadataAccountArgsV3: {
                    data: onChainData,
                    isMutable: true,
                    collectionDetails: null,
                },
            }
        )
    );

    // 7. Add Instruction: Create Associated Token Account for the creator
    const associatedToken = await getAssociatedTokenAddress(
        mint,
        payer
    );

    transaction.add(
        createAssociatedTokenAccountInstruction(
            payer,
            associatedToken,
            payer,
            mint
        )
    );

    // 8. Add Instruction: Mint Initial Supply to Creator (e.g., 1 billion tokens)
    const amount = 1_000_000_000 * Math.pow(10, 9); // 1 Billion

    transaction.add(
        createMintToInstruction(
            mint,
            associatedToken,
            payer,
            amount
        )
    );

    // 9. Send Transaction
    transaction.feePayer = payer;
    const { blockhash } = await connection.getLatestBlockhash();
    transaction.recentBlockhash = blockhash;

    // Partial sign with mint keypair
    transaction.partialSign(mintKeypair);

    // Request wallet signature
    const signedTransaction = await signTransaction(transaction);

    // Send raw transaction
    const signature = await connection.sendRawTransaction(signedTransaction.serialize());

    // Confirm
    await connection.confirmTransaction(signature, 'confirmed');

    return { signature, mintAddress: mint.toBase58() };
}
