import mongoose from 'mongoose';
import mongooseSlugPlugin from 'mongoose-slug-plugin';

// Connect to MongoDB
mongoose.connect(process.env.DSN);

// User Schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    hash: { type: String, required: true },
    rounds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Round' }],
    /*rankings: {
      type: Map,
      of: String, 
      default: new Map()
    }*/
  });
  

// Round Schema
const roundSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
  courseName: { type: String, required: true },
  slug: { type: String, slug: "courseName", unique: true },
  date: { type: Date, required: true },
  score: { type: Number, required: true },
  yardage: { type: Number },
  courseInfo: {
    coursePar: { type: Number, required: true },
    courseRating: { type: Number },
    slopeRating: { type: Number }
  },
  roundStats: {
    fairways: { type: Number, default: 0 }, 
    GIRs: { type: Number, default: 0 }, 
    upAndDowns: { type: Number, default: 0 },
    putts: { type: Number, default: 0 }
  },
  createdAt: { type: Date, default: Date.now }
});

roundSchema.plugin(mongooseSlugPlugin, {tmpl: '<%=courseName%>'});

// Models
const User = mongoose.model('User', userSchema);
const Round = mongoose.model('Round', roundSchema);

export { User, Round };
