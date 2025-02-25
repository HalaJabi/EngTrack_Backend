const Bookmark = require('../models/Bookmark');
const Job = require('../models/Job');

module.exports = {
  /*
   createBookmark: async (req, res) => {
       const newBook = new Bookmark(req.body);

       try {
           const savedBookmark = await newBook.save();
           const { __v, updatedAt, ...newBookmarkInfo } = savedBookmark._doc;
           res.status(200).json(newBookmarkInfo)
       } catch (error) {
           res.status(500).json(error)
       }
  },
*/
  createBookmark: async (req, res) => {
    const jobID = req.body.job;

    try {
      const job = await Job.findById(jobID); // Retrieve the job data by ID

      if (!job) {
        return res.status(404).json({ error: 'Job not found' });
      }

      const newBook = new Bookmark({ job: job, userId: req.user.id }); // Create a new bookmark with the populated job data

      const savedBookmark = await newBook.save();

      const { __v, updatedAt, ...newBookmarkInfo } = savedBookmark._doc;

      res.status(200).json(newBookmarkInfo);
    } catch (error) {
      res.status(500).json(error);
    }
  },


  deleteBookmark: async (req, res) => {
    try {
      const userId = req.user.id;
      const jobId = req.params.id;
  
      // Find the bookmark based on both userId and jobId
      await Bookmark.findOneAndDelete({ userId, job: jobId });
  
      res.status(200).json('Bookmark successfully deleted');
    } catch (error) {
      res.status(500).json(error);
    }
  },

/*
  deleteBookmark: async (req, res) => {
    try {
      const userId = req.user.id;
      const jobId = req.params.id;
      var bookmarks = await Bookmark.find({ userId: req.user.id }).populate(
        'job',
        '-requirements'
      );
      console.info(bookmarks.length);
      await Bookmark.findOneAndRemove({ userId: userId, job: jobId });

      bookmarks = await Bookmark.find({ userId: req.user.id }).populate(
        'job',
        '-requirements'
      );
      console.info(bookmarks.length);

      res.status(200).json('Bookmark successfully deleted');
    } catch (error) {
      res.status(500).json(error);
    }
  },
  */
 getBookmarks: async (req, res) => {
    try {
      const bookmarks = await Bookmark.find({ userId: req.user.id }).populate(
        'job',
        '-requirements'
      );
      res.status(200).json(bookmarks);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
