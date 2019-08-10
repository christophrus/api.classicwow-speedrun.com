const mongoose = require('mongoose');

const { Schema } = mongoose;

const speedLevelRunSchema = new Schema({
  guid: { type: String, required: true, index: true },
  addonVersion: String,
  wowVersion: String,
  name: String,
  faction: String,
  realmName: String,
  race: String,
  class: String,
  options: {
    preset: String,
    targetLevel: Number,
    difficulty: String,
    focus: String,
    ah: Boolean,
    buff: Boolean,
    party: Boolean,
    trade: Boolean,
    mail: Boolean,
    rest: Boolean
  },
  equipment: [
    {
      time: Date,
      id: Number,
      slot: Number
    }
  ],
  buffs: [
    {
      time: Date,
      snapshot: [
        {
          name: String,
          icon: Number,
          count: Number,
          duration: Number,
          source: String,
          spellId: Number
        }
      ]
    }
  ],
  money: [
    {
      time: Date,
      balance: Number
    }
  ],
  talents: [
    {
      time: Date,
      snapshot: [
        {
          name: String,
          id: Number,
          available: Number,
          spent: Number
        }
      ]
    }
  ],
  spells: [
    {
      time: Date,
      id: Number
    }
  ],
  groups: [
    {
      time: Date,
      event: String
    }
  ],
  mail: [
    {
      time: Date
    }
  ],
  ah: [
    {
      time: Date
    }
  ],
  rested: [
    {
      time: Date,
      text: String,
      restedXP: Number
    }
  ],
  death: [
    {
      time: Date
    }
  ],
  trade: [
    {
      time: Date
    }
  ],
  quests: [
    {
      time: Date,
      id: Number
    }
  ]
});

const SpeedLevelRun = mongoose.model('SpeedLevelRun', speedLevelRunSchema);

module.exports = SpeedLevelRun;
