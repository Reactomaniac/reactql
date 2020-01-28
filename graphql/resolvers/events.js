const Event = require("../../models/event");
const User = require("../../models/user");

const { transformEvent } = require("./merge");

module.exports = {
  events: async () => {
    try {
      const events = await Event.find()
      return events.map(event => {
        return transformEvent(event);
      })
    } catch(err) {
      throw err;
    }
  },
  createEvent: async args => {
    const event = new Event({
      title: args.eventInput.title,
      description: args.eventInput.description,
      price: +args.eventInput.price,
      date: new Date(args.eventInput.date),
      creator: "5e2846d0381cfb5b258409e4"
    });
    let createdEvent;
    try {
      const result = await event.save()
      createdEvent = transformEvent(result);
      const existingUser = await User.findById("5e2846d0381cfb5b258409e4")
      if (!existingUser) {
        throw new Error("User not found.");
      }
      existingUser.createdEvents.push(event);
      await existingUser.save();
      return createdEvent;
    } catch(err) {
      console.log(err);
      throw err;
    }
  }
}
