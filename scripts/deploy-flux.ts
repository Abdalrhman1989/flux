
import {
    Connection,
    Keypair,
    clusterApiUrl,
    LAMPORTS_PER_SOL
} from '@solana/web3.js';
import {
    createMint,
    getOrCreateAssociatedTokenAccount,
    mintTo
} from '@solana/spl-token';

// Script to deploy Flux Coin ($FLUX)
// Run with: npx tsx scripts/deploy-flux.ts

async function main() {
    console.log("🚀 Starting deployment of Flux Coin ($FLUX)...");

    // 1. Connect to Devnet (Change to 'mainnet-beta' for real money launch)
    const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

    // 2. Generate Wallet (In production, load your real Keypair from a file)
    const payer = Keypair.generate();
    console.log("Created wallet:", payer.publicKey.toBase58());

    // 3. Fund Wallet (Devnet Only)
    console.log("Requesting airdrop...");
    try {
        const signature = await connection.requestAirdrop(
            payer.publicKey,
            2 * LAMPORTS_PER_SOL
        );
        await connection.confirmTransaction(signature);
        console.log("Airdrop successful!");
    } catch (e) {
        console.error("Airdrop failed. If on Mainnet, you must fund this wallet with real SOL manually.");
        // return; 
    }

    // 4. Create Mint
    console.log("Creating Mint Account...");
    const mint = await createMint(
        connection,
        payer,
        payer.publicKey, // Mint Authority
        payer.publicKey, // Freeze Authority
        9 // Decimals
    );
    console.log("Mint Address:", mint.toBase58());

    // 5. Get/Create Token Account
    console.log("Creating Token Account...");
    const tokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        payer,
        mint,
        payer.publicKey
    );
    console.log("Token Account:", tokenAccount.address.toBase58());

    // 6. Mint Tokens
    console.log("Minting 1 Billion FLUX tokens...");
    await mintTo(
        connection,
        payer,
        mint,
        tokenAccount.address,
        payer,
        1_000_000_000 * Math.pow(10, 9)
    );

    console.log("✅ Success! FLUX coins minted.");
    console.log(`Explore on Solana FM: https://solana.fm/address/${mint.toBase58()}?cluster=devnet-solana`);
}

main().catch(console.error);
