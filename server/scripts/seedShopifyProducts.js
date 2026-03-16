import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Product from '../models/Product.js';
import connectDB from '../config/db.js';

dotenv.config();
connectDB();

// Helper to strip HTML tags from descriptions
function stripHtml(html) {
    return html.replace(/<[^>]*>/g, '').replace(/&amp;/g, '&').replace(/&#[0-9]+;/g, '').replace(/\s+/g, ' ').trim();
}

const toyProducts = [
    {
        name: "Mini Die-Cast Vehicle Set - 4 Pack (Cars & Trucks)",
        price: 299,
        originalPrice: 399,
        category: "Toys",
        ageGroup: "3y+",
        rating: 4.5,
        reviews: 312,
        inStock: true,
        image: "http://localhost:5000/assets/toys/toy_diecast_cars.png",
        description: "Set of 4 mini die-cast metal vehicles including cars and trucks. Durable alloy construction with smooth rolling wheels. Perfect for imaginative play and motor skill development. Suitable for ages 3 and above."
    },
    {
        name: "Pull-Back Friction Racer Set - 6 Cars",
        price: 349,
        originalPrice: 499,
        category: "Toys",
        ageGroup: "3y+",
        rating: 4.4,
        reviews: 278,
        inStock: true,
        image: "http://localhost:5000/assets/toys/toy_pullback_racers.png",
        description: "Set of 6 pull-back friction powered racing cars in assorted bright colors. No batteries needed — just pull back and release! Great for group play and hand-eye coordination. Safe and durable plastic construction."
    },
    {
        name: "Construction Truck Set - Excavator, Bulldozer & Dumper",
        price: 599,
        originalPrice: 799,
        category: "Toys",
        ageGroup: "2y+",
        rating: 4.6,
        reviews: 421,
        inStock: true,
        image: "http://localhost:5000/assets/toys/toy_construction_trucks.png",
        description: "Heavy-duty construction vehicle set with excavator, bulldozer, and dumper truck. Made from durable non-toxic plastic. Movable parts for realistic play experience. Develops imaginative play and fine motor skills."
    },
    {
        name: "Thomas & Friends Wooden Train Engine Set",
        price: 799,
        originalPrice: 1099,
        category: "Toys",
        ageGroup: "2y+",
        rating: 4.7,
        reviews: 534,
        inStock: true,
        image: "http://localhost:5000/assets/toys/toy_train_set.png",
        description: "Classic Thomas & Friends wooden magnetic train set. Includes Thomas engine and 2 track pieces. Compatible with most wooden train tracks. Safe wood construction with smooth rounded edges. Encourages imaginative and creative play."
    },
    {
        name: "Puzzle Mastering Castle Building Blocks Set",
        price: 499,
        originalPrice: 699,
        category: "Toys",
        ageGroup: "4y+",
        rating: 4.5,
        reviews: 198,
        inStock: true,
        image: "http://localhost:5000/assets/toys/toy_castle_blocks.png",
        description: "Creative castle building block puzzle set with 60+ pieces. Builds spatial reasoning and problem-solving skills. Premium quality non-toxic plastic. Compatible pieces that snap together securely. Suitable for ages 4 and above."
    },
    {
        name: "Mini Racing Cars Blister Pack - 4 Pack",
        price: 199,
        originalPrice: 299,
        category: "Toys",
        ageGroup: "3y+",
        rating: 4.3,
        reviews: 245,
        inStock: true,
        image: "http://localhost:5000/assets/toys/toy_diecast_cars.png",
        description: "Pack of 4 mini friction-powered racing cars in vibrant colors. Realistic car design with smooth rubber wheels. No batteries required. Great party favors or stocking stuffers. Ages 3+."
    },
    {
        name: "Super Speed Diecast Monster Trucks - Set of 3",
        price: 449,
        originalPrice: 599,
        category: "Toys",
        ageGroup: "3y+",
        rating: 4.4,
        reviews: 187,
        inStock: true,
        image: "http://localhost:5000/assets/toys/toy_monster_trucks.png",
        description: "Set of 3 die-cast monster trucks with oversized rugged wheels. Pull-back action for racing fun. Sturdy alloy metal body with vibrant designs. Perfect for kids who love big trucks and outdoor play."
    },
    {
        name: "Friction Powered Military Vehicle Playset",
        price: 399,
        originalPrice: 549,
        category: "Toys",
        ageGroup: "3y+",
        rating: 4.2,
        reviews: 156,
        inStock: true,
        image: "https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=600&q=80",
        description: "Military themed friction powered vehicle playset including jeep, tank, and armored truck. Made from durable ABS plastic. Realistic detailing for imaginative play. Non-toxic and safe for children 3 years and above."
    },
    {
        name: "Colorful Wooden Shape Sorting Puzzle Board",
        price: 349,
        originalPrice: 499,
        category: "Toys",
        ageGroup: "1y+",
        rating: 4.6,
        reviews: 367,
        inStock: true,
        image: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=600&q=80",
        description: "Wooden shape sorting puzzle board with 8 brightly colored shapes. Natural wood construction with non-toxic paint. Develops shape recognition, color identification, and fine motor skills. Perfect first puzzle for toddlers 12 months and above."
    },
    {
        name: "Remote Control Racing Car with LED Lights",
        price: 999,
        originalPrice: 1499,
        category: "Toys",
        ageGroup: "5y+",
        rating: 4.5,
        reviews: 289,
        inStock: true,
        image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=600&q=80",
        description: "High-speed remote control racing car with LED headlights and tail lights. 2.4GHz wireless control with 30m range. Rechargeable battery. Forward, backward, left and right controls. Durable ABS shell. Suitable for ages 5 and above."
    },
    {
        name: "Jungle Animal Vehicle Set - 6 Pack",
        price: 549,
        originalPrice: 749,
        category: "Toys",
        ageGroup: "2y+",
        rating: 4.4,
        reviews: 213,
        inStock: true,
        image: "http://localhost:5000/assets/toys/toy_pullback_racers.png",
        description: "Set of 6 jungle animal themed mini vehicles. Includes lion car, elephant truck, giraffe bus and more. Friction powered — no batteries needed. BPA-free plastic construction. Safe for toddlers 2 years and above."
    },
    {
        name: "Magnetic Fishing Game Toy Set",
        price: 299,
        originalPrice: 399,
        category: "Toys",
        ageGroup: "2y+",
        rating: 4.5,
        reviews: 342,
        inStock: true,
        image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&q=80",
        description: "Fun magnetic fishing game with 2 fishing rods and 10 colorful fish. Develops hand-eye coordination and counting skills. Durable plastic pool tub included. Great indoor activity for toddlers. Suitable for 2 years and above."
    },
    {
        name: "Die-Cast Fire Engine Truck with Lights & Sound",
        price: 699,
        originalPrice: 999,
        category: "Toys",
        ageGroup: "3y+",
        rating: 4.6,
        reviews: 198,
        inStock: true,
        image: "https://images.unsplash.com/photo-1569372489834-b500d9b05e5c?w=600&q=80",
        description: "Realistic die-cast fire engine truck with working LED lights and siren sound. Scale model with extendable ladder. Pull-back action drive. Requires 3 x AA batteries (not included). Great gift for vehicle enthusiasts aged 3+."
    },
    {
        name: "Building Bricks Starter Set - 100 Pieces",
        price: 449,
        originalPrice: 599,
        category: "Toys",
        ageGroup: "4y+",
        rating: 4.7,
        reviews: 456,
        inStock: true,
        image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=600&q=80",
        description: "100-piece classic building brick set compatible with all major brands. Bright primary and secondary colors. Non-toxic ABS plastic. Promotes creativity, spatial awareness, and engineering thinking. Suitable for children 4 years and above."
    },
    {
        name: "Bubble Gun Blaster with LED Lights",
        price: 249,
        originalPrice: 349,
        category: "Toys",
        ageGroup: "3y+",
        rating: 4.3,
        reviews: 321,
        inStock: true,
        image: "https://images.unsplash.com/photo-1618842676088-c4d48a6a7571?w=600&q=80",
        description: "Fun automatic bubble gun that shoots hundreds of bubbles per minute. Features colorful LED lights for nighttime fun. Requires 4 x AA batteries. Includes bubble solution. Great outdoor toy for kids aged 3 and above."
    },
    {
        name: "Toddler Push & Go Friction Cars - Pack of 3",
        price: 349,
        originalPrice: 449,
        category: "Toys",
        ageGroup: "1y+",
        rating: 4.4,
        reviews: 267,
        inStock: true,
        image: "http://localhost:5000/assets/toys/toy_diecast_cars.png",
        description: "Set of 3 chunky push & go friction cars designed for toddler hands. Extra-large, easy-to-grip body. No sharp edges — safe for babies 12 months+. Smooth wheels that zip across floors. Durable non-toxic plastic in bright colors."
    },
    {
        name: "Educational Alphabet & Number Puzzle Board",
        price: 399,
        originalPrice: 549,
        category: "Toys",
        ageGroup: "2y+",
        rating: 4.6,
        reviews: 389,
        inStock: true,
        image: "http://localhost:5000/assets/toys/toy_castle_blocks.png",
        description: "Dual-sided educational puzzle board with alphabet letters on one side and numbers on the other. Colorful wooden pieces with smooth edges. Develops early literacy and numeracy. Easy-grip knobs for small hands. Suitable for ages 2 and above."
    },
    {
        name: "Soft Plush Stuffed Teddy Bear, 30cm",
        price: 299,
        originalPrice: 399,
        category: "Toys",
        ageGroup: "0m+",
        rating: 4.8,
        reviews: 512,
        inStock: true,
        image: "https://images.unsplash.com/photo-1559454403-b8fb88521f11?w=600&q=80",
        description: "Super soft plush teddy bear, 30cm tall. Made from premium hypoallergenic materials. Safe for newborns and infants. Machine washable. The perfect cuddle companion for babies and toddlers. Available in brown and white."
    },
    {
        name: "Sand & Water Play Table with Accessories",
        price: 1299,
        originalPrice: 1799,
        category: "Toys",
        ageGroup: "2y+",
        rating: 4.5,
        reviews: 178,
        inStock: true,
        image: "https://images.unsplash.com/photo-1560343776-97e7d202ff0e?w=600&q=80",
        description: "Dual activity sand and water play table with 15+ accessories including shovels, molds, and cups. Removable inner tub for easy cleaning. Foldable legs for storage. Great for sensory development. Suitable for ages 2 and above."
    },
    {
        name: "Baby Rattle & Teether Gift Set - 6 Piece",
        price: 399,
        originalPrice: 549,
        category: "Toys",
        ageGroup: "0m+",
        rating: 4.6,
        reviews: 445,
        inStock: true,
        image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=600&q=80",
        description: "6-piece baby rattle and teether gift set in a beautiful box. Includes 3 rattles and 3 teethers in assorted shapes and colors. BPA-free, food-grade silicone. Safe for newborns. Helps soothe teething discomfort. Great baby shower gift."
    }
];

const shopifyProducts = [
    {
        name: "Hippo Spout Sipper for Infant/Toddler, 225ml",
        price: 260,
        originalPrice: 275,
        category: "Feeding",
        ageGroup: "6m+",
        rating: 4.3,
        reviews: 142,
        inStock: true,
        image: "https://cdn.shopify.com/s/files/1/0766/8141/2807/files/E-COM01_17e520f7-2f53-46cb-83ea-5c5d1d9353af.webp",
        description: "LuvLap Hippo Spout Sipper for Infant/Toddler, 225ml, Anti-Spill Sippy Cup with Soft Silicone Spout BPA Free, 6m+"
    },
    {
        name: "Moby Little Spout Sippy Cup, 240ml",
        price: 250,
        originalPrice: 285,
        category: "Feeding",
        ageGroup: "6m+",
        rating: 4.2,
        reviews: 118,
        inStock: true,
        image: "https://cdn.shopify.com/s/files/1/0766/8141/2807/files/E-COM01_69d692c2-80fe-4607-b030-5d1b44e81f4d.webp",
        description: "LuvLap Mobby Little Sipper helps through baby's transition stages to drink independently. It comes with a soft silicone spout that is bite resistant. Built in touch-flow valve allows baby led drinking and helps avoid any spills or mess. All parts are sterilizer safe and BPA free."
    },
    {
        name: "Banana Time 2 In 1 Spout And Straw Sipper",
        price: 239,
        originalPrice: 315,
        category: "Feeding",
        ageGroup: "6m+",
        rating: 4.4,
        reviews: 205,
        inStock: true,
        image: "https://cdn.shopify.com/s/files/1/0766/8141/2807/files/E-COM01_8e118b38-162f-4a70-980e-6a59d4b70879.webp",
        description: "LuvLap Banana Time Sipper helps through baby's transition stages to drink independently. It comes with both, spout and straw to support two stages of transition. Built in touch-flow valve allows baby led drinking. All parts are sterilizer safe and BPA free."
    },
    {
        name: "Banana Time 2-in-1 Straw & Spout Cup, 150ml",
        price: 250,
        originalPrice: 295,
        category: "Feeding",
        ageGroup: "6m+",
        rating: 4.3,
        reviews: 176,
        inStock: true,
        image: "https://cdn.shopify.com/s/files/1/0766/8141/2807/files/E-COM01_359ea1a2-d25f-4a51-8a3b-7c4139262f17.webp",
        description: "LuvLap Banana Time Sipper helps through baby's transition stages to drink independently. It comes with both, a spout and a straw to support two stages of transition. The handles are designed as per baby's little hands and are detachable. Built in touch-flow valve allows baby led drinking. All parts are sterilizer safe and BPA free."
    },
    {
        name: "Tiny Giffy Straw Sipper, 300ml",
        price: 249,
        originalPrice: 279,
        category: "Feeding",
        ageGroup: "6m+",
        rating: 4.2,
        reviews: 134,
        inStock: true,
        image: "https://cdn.shopify.com/s/files/1/0766/8141/2807/files/18825_Tinny_Giffy_Sippy_Cup_-_Purple_A__2.webp",
        description: "LuvLap Tiny Giffy Sipper helps through baby's transition stages to drink independently. It comes with a soft silicone straw which supports dental health. The handles are designed as per baby's little hands and are detachable. Built in touch-flow valve allows baby led drinking. All parts are sterilizer safe and BPA free."
    },
    {
        name: "Baby Bite Resistant Soft Straw Sipper Cup, 300ml",
        price: 330,
        originalPrice: 389,
        category: "Feeding",
        ageGroup: "6m+",
        rating: 4.5,
        reviews: 289,
        inStock: true,
        image: "https://cdn.shopify.com/s/files/1/0766/8141/2807/files/19089_HappyDinoStrawSipper-Brown_E-Comm_1.webp",
        description: "LuvLap Bite Resistant Soft Silicone Straw Sipper Cup with Handle, with Weighted Straw, Sippy Cup with Anti Spill Lock, BPA Free, 300ml. Training Cup for Kids."
    },
    {
        name: "Anti-Colic Wide Neck Natura Flo Baby Feeding Bottle, 250ml",
        price: 170,
        originalPrice: 200,
        category: "Feeding",
        ageGroup: "0m+",
        rating: 4.4,
        reviews: 312,
        inStock: true,
        image: "https://cdn.shopify.com/s/files/1/0766/8141/2807/files/18910.webp",
        description: "LuvLap Natura Flow Feeding Bottle 250ml. 100% PP Feeding Bottle, BPA Free. Liquid Silicone Teat with advanced anti-colic valve. Wide based Grooved Nipple helps Natural latch-on. No Nipple Collapse. Ergonomic Bottle shape."
    },
    {
        name: "Anti-Colic Wide Neck Natura Flo Baby Feeding Bottle, 250ml (Pink)",
        price: 170,
        originalPrice: 200,
        category: "Feeding",
        ageGroup: "0m+",
        rating: 4.3,
        reviews: 198,
        inStock: true,
        image: "https://cdn.shopify.com/s/files/1/0766/8141/2807/files/18909.webp",
        description: "LuvLap Natura Flow Feeding Bottles are ergonomically designed to be easily held while feeding the baby. All LuvLap bottles are 100% BPA free and fully sterilizable. The teats are 100% Liquid Silicone and have an anti-colic valve. Wide base helps the baby get a natural latch, similar to that on the mother's breast."
    },
    {
        name: "Anti-Colic Wide Neck Natura Flo Baby Feeding Bottle, 150ml",
        price: 150,
        originalPrice: 180,
        category: "Feeding",
        ageGroup: "0m+",
        rating: 4.3,
        reviews: 245,
        inStock: true,
        image: "https://cdn.shopify.com/s/files/1/0766/8141/2807/files/18908.webp",
        description: "LuvLap Natura Flow 150ml Feeding Bottle. 100% BPA free and fully sterilizable. Anti-colic valve vents air into the bottle. Wide base helps natural latch-on, similar to the mother's breast. Helps easy transition between breastfeeding and bottle feeding."
    },
    {
        name: "Anti-Colic Wide Neck Natura Flo Feeding Bottle, 150ml, Floral",
        price: 150,
        originalPrice: 180,
        category: "Feeding",
        ageGroup: "0m+",
        rating: 4.4,
        reviews: 167,
        inStock: true,
        image: "https://cdn.shopify.com/s/files/1/0766/8141/2807/files/18907.webp",
        description: "LuvLap Natura Flow Feeding Bottle 150ml Floral design. 100% BPA free and fully sterilizable. Anti-colic valve prevents air from entering the baby's tummy. Wide base for natural latch. Helps easy transition between breastfeeding and bottle feeding."
    },
    {
        name: "Anti-Colic Slim Neck Essential Feeding Bottle, 250ml, Jungle Tales (Blue)",
        price: 130,
        originalPrice: 160,
        category: "Feeding",
        ageGroup: "0m+",
        rating: 4.2,
        reviews: 143,
        inStock: true,
        image: "https://cdn.shopify.com/s/files/1/0766/8141/2807/files/18906.webp",
        description: "LuvLap Essential Feeding Bottles 250ml, Jungle Tales Blue. 100% BPA free and fully sterilizable. Anti-colic valve vents air into the bottle. Spiral grooves encourage peristaltic suckling. Superior silicone quality ensures no nipple collapse."
    },
    {
        name: "Anti-Colic Slim Neck Essential Feeding Bottle, 250ml, Wild Flower",
        price: 130,
        originalPrice: 160,
        category: "Feeding",
        ageGroup: "0m+",
        rating: 4.2,
        reviews: 121,
        inStock: true,
        image: "https://cdn.shopify.com/s/files/1/0766/8141/2807/files/18905.webp",
        description: "LuvLap Essential Feeding Bottle 250ml Wild Flower design. 100% BPA free and fully sterilizable. Anti-colic valve. Spiral grooves at tip encourage peristaltic suckling. Superior silicone quality ensures no nipple collapse for an uninterrupted feed."
    },
    {
        name: "Slim Neck Essential Feeding Bottle, 125ml, Jungle Tales",
        price: 100,
        originalPrice: 130,
        category: "Feeding",
        ageGroup: "0m+",
        rating: 4.1,
        reviews: 98,
        inStock: true,
        image: "https://cdn.shopify.com/s/files/1/0766/8141/2807/files/18904.webp",
        description: "LuvLap Essential Feeding Bottle 125ml, Jungle Tales design. 100% BPA free and fully sterilizable. Anti-colic valve. Spiral grooves at tip encourage peristaltic suckling. Comfortable latch for baby. Grooved teats prevent nipple collapse."
    },
    {
        name: "Anti-Colic Slim Neck Essential Feeding Bottle, 125ml, Wild Flower",
        price: 110,
        originalPrice: 130,
        category: "Feeding",
        ageGroup: "0m+",
        rating: 4.2,
        reviews: 112,
        inStock: true,
        image: "https://cdn.shopify.com/s/files/1/0766/8141/2807/files/18903.webp",
        description: "LuvLap Essential Feeding Bottle 125ml Wild Flower. 100% BPA free and fully sterilizable. Anti-colic valve. Spiral grooves at tip encourage peristaltic suckling. Comfortable latch for baby. Superior silicone quality, no nipple collapse."
    },
    {
        name: "Anti-Colic Wide Neck Natura Flo Feeding Bottle, 250ml (Green)",
        price: 160,
        originalPrice: 185,
        category: "Feeding",
        ageGroup: "0m+",
        rating: 4.3,
        reviews: 187,
        inStock: true,
        image: "https://cdn.shopify.com/s/files/1/0766/8141/2807/files/18902.webp",
        description: "LuvLap Natura Flow 250ml Feeding Bottle. Ergonomically designed for easy holding. 100% BPA free. Anti-colic valve prevents air from entering the baby's tummy. Wide base for natural latch. Helps easy transition between breastfeeding and bottle feeding."
    },
    {
        name: "Anti-Colic Wide Neck Natura Flo Feeding Bottle, 150ml (Plain)",
        price: 150,
        originalPrice: 170,
        category: "Feeding",
        ageGroup: "0m+",
        rating: 4.2,
        reviews: 156,
        inStock: true,
        image: "https://cdn.shopify.com/s/files/1/0766/8141/2807/files/18901.webp",
        description: "LuvLap Natura Flow 150ml Feeding Bottle. 100% BPA free. Anti-colic valve vents air into the bottle. Wide base grooved nipple helps natural latch-on. No nipple collapse. Ergonomic bottle shape for easy feeding."
    },
    {
        name: "Essential Slim Neck Feeding Bottle, Plain 125ml",
        price: 100,
        originalPrice: 125,
        category: "Feeding",
        ageGroup: "0m+",
        rating: 4.1,
        reviews: 89,
        inStock: true,
        image: "https://cdn.shopify.com/s/files/1/0766/8141/2807/files/18899.webp",
        description: "LuvLap Essential Slim Neck Feeding Bottle 125ml Plain. 100% PP Feeding Bottle, BPA Free. Liquid Silicone Teat with advanced anti-colic valve. Spiral Grooved Nipple for comfortable latch. No Nipple Collapse. Ergonomic Bottle shape."
    },
    {
        name: "Anti-Colic Slim Neck Essential Feeding Bottle, 250ml",
        price: 135,
        originalPrice: 150,
        category: "Feeding",
        ageGroup: "0m+",
        rating: 4.3,
        reviews: 234,
        inStock: true,
        image: "https://cdn.shopify.com/s/files/1/0766/8141/2807/files/18900.webp",
        description: "LuvLap Anti-Colic Slim Neck Essential Baby Feeding Bottle 250ml. BPA-free materials, easy to hold, ideal for babies of all ages. Slim neck design reduces air intake, reducing risk of colic and gas. 100% Liquid Silicone Teat with anti-colic valve. Spiral Grooved Nipple for comfortable latch."
    }
];

const seedProducts = async () => {
    try {
        console.log('🌱 Starting Shopify products seed...\n');
        console.log(`📦 Preparing to seed ${shopifyProducts.length} products from Shopify store\n`);

        // Clear existing products
        await Product.deleteMany({});
        console.log('🗑️  Cleared existing products');

        // Insert products (toys + feeding/other products)
        const allProducts = [...toyProducts, ...shopifyProducts];
        const products = await Product.insertMany(allProducts);
        console.log(`✅ Successfully seeded ${products.length} products\n`);

        console.log('📋 Products seeded:');
        products.forEach((p, i) => {
            console.log(`  ${i + 1}. ${p.name} — ₹${p.price} (was ₹${p.originalPrice})`);
        });

        console.log('\n✨ Database seed from Shopify completed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error.message);
        process.exit(1);
    }
};

seedProducts();
