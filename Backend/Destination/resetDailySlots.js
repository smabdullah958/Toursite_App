const DestinationDatabase = require("../Models/DestinationDataBase");
const cron = require('node-cron');

async function resetDailySlots() {
    try {
        console.log("🔄 Starting daily slot reset...");
        
        const todayDate = new Date().toISOString().split("T")[0];
        console.log(`📅 Today's date: ${todayDate}`);
        
        const destinations = await DestinationDatabase.find();
        
        if (!destinations || destinations.length === 0) {
            console.log("⚠️ No destinations found");
            return;
        } 

        let updatedCount = 0;

        for (const destination of destinations) {
            let isModified = false;

            // ✅ Check if BookingOption exists
            if (!destination.BookingOption || destination.BookingOption.length === 0) {
                console.log("no boking option");
                continue;
            }

            destination.BookingOption.forEach(option => {
                // ✅ Initialize SlotByDate if it doesn't exist
                if (!option.SlotByDate) {
                    option.SlotByDate = [];
                    isModified = true;
                    console.log("🔧 Initialized SlotByDate ");
                }

                // ✅ Check if today already exists in SlotByDate
                const todaySlot = option.SlotByDate.find(s => s.Date === todayDate);

                if (!todaySlot) {
                    // ✅ Add today's slot with current Slots value
                    option.SlotByDate.push({
                        Date: todayDate,
                        RemainingSlots: option.Slots || option.OriginalSlots || 0
                    });
                    isModified = true;
                    console.log("Added today's slot for slots");
                }
            });

            if (isModified) {
                await destination.save();
                updatedCount++;
                console.log(" Saved");
            }
        }

    } catch (error) {
        console.error("❌ Error in ResetDailySlots:", error);
        console.error("Stack trace:", error.stack);
    }
}

// Schedule to run at 1:31 PM (your current time for testing)
const ResetDestinationDailySlots = () => {
    cron.schedule('0 0 * * *', () => {
       console.log('⏰ Running daily slot reset job...');
        resetDailySlots();
    }, {
        timezone: "Asia/Dubai"
    });
    
    console.log("✅ Cron job scheduled: Daily reset at 13:31 (Asia/Karachi)");
    console.log("⏰ Next run: Today at 1:31 PM or tomorrow");
};

module.exports = ResetDestinationDailySlots;