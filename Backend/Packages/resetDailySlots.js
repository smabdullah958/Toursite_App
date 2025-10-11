const PackageDatabase = require("../Models/PackagesDatabase"); // Destination model

const cron = require('node-cron');


async function resetDailySlots() {
    try {
        console.log("🔄 Starting daily slot reset...");
        
        const todayDate = new Date().toISOString().split("T")[0];
        console.log(`📅 Today's date: ${todayDate}`);
                 
        const packages = await PackageDatabase.find();
        
        if (!packages || packages.length === 0) {
            console.log("⚠️ No packages found");
            return;
        }

        let updatedCount = 0;

        for (const package of packages) {
            let isModified = false;

            // ✅ Check if BookingOption exists
            if (!package.BookingOption || package.BookingOption.length === 0) {
                console.log(`⚠️ ${package.Title} has no BookingOption`);
                continue;
            }

            package.BookingOption.forEach(option => {
                // ✅ Initialize SlotByDate if it doesn't exist
                if (!option.SlotByDate) {
                    option.SlotByDate = [];
                    isModified = true;
                    console.log(`🔧 Initialized SlotByDate for ${package.Title} - ${option.Category}`);
                }

                // ✅ Check if today slots already exists in SlotByDate
                const todaySlot = option.SlotByDate.find(s => s.Date === todayDate);
                //if exists
                if (!todaySlot) {
                    // ✅ Add today's slot with current Slots value
                    option.SlotByDate.push({
                        Date: todayDate,
                        RemainingSlots: option.Slots || option.OriginalSlots || 0
                    });
                    isModified = true;
                    console.log(`✅ Added today's slot for ${package.Title} - ${option.Category}: ${option.Slots} slots`);
                }
            });

            if (isModified) {
                await package.save();
                updatedCount++;
                console.log(`💾 Saved: ${package.Title}`);
            }
        }

        console.log(`\n✅ Daily slots reset completed for ${todayDate}`);
        console.log(`📊 Updated ${updatedCount} packages`);

    } catch (error) {
        console.error("❌ Error in ResetDailySlots:", error);
        console.error("Stack trace:", error.stack);
    }
}

// Schedule the job to run every day at 12:00 AM (midnight)
ResetPackageDailySlots = () => {
cron.schedule('0 0 * * *', () => {
  console.log('Running daily slot reset job...');
  resetDailySlots();
}, {
  timezone: "Asia/Dubai" // Set to your server/target timezone (e.g., UAE for AED currency)
})
};

module.exports=ResetPackageDailySlots;