let Database = require("../Models/PackagesBookNow");

let SearchBar = async (req, res) => {
  try {
    let { SearchByAnyThing, SearchByDate } = req.query;
    console.log(SearchByAnyThing, SearchByDate);

    let SearchClient = {};

    // If searching by date ( stored as string)
    if (SearchByDate) {
      SearchClient.Date = { $regex: SearchByDate };
    }

    // First find bookings
    let SearchResult = await Database.find(SearchClient)
      .populate("UserID", "Name Email") // only Name, Email from User
      .populate("PackageID", "Title BasePrice") // only Title, BasePrice from Destination
      .sort({ createdAt: -1 });

    // Now filter by Name, Email, Title, Contact, WhatsApp
    if (SearchByAnyThing) {
      let regex = new RegExp(SearchByAnyThing, "i");

      SearchResult = SearchResult.filter((item) => {
        return (
          regex.test(item.UserID?.Name) ||
          regex.test(item.UserID?.Email) ||
          regex.test(item.DestinationID?.Title) ||
          regex.test(item.ContactNumber) ||
          regex.test(item.WhatsAppNumber)
        );
      });
    }
console.log(SearchResult,SearchResult.length)
    res.status(200).json(SearchResult,SearchResult.length);
  } catch (error) {
    console.log("internal error", error);
    res.status(500).json({ message: "internal error", error });
  }
};

module.exports = SearchBar;
