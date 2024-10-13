const Link = require('../models/link');

const getLinks = async (req, res) => {
  try {
    const links = await Link.find({
      user: req.user._id,
    }).sort({ order: 1 });
    return res.send(links);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send('Error while getting list of links. Try again later.');
  }
};

const updateLinks = async (req, res) => {
  try {
    const links = req.body.links;
    for (let i = 0; i < links.length; i++) {
      const link = links[i];
      const existingLink = await Link.findOne({
        platform: link.platform,
        user: req.user._id,
      });
      if (existingLink) {
        await existingLink.updateOne({
          platform: link.platform,
          link: link.link,
          order: link.order,
        });
      } else {
        const { _id, ...restToAdd } = link;
        const newLink = new Link({
          ...restToAdd,
          user: req.user._id,
        });
        await newLink.save();
      }
    }

    return res.send();
  } catch (error) {
    console.log(error);
    return res.status(500).send('Error while adding a link. Try again later.');
  }
};

const deleteLink = async (req, res) => {
  try {
    const link = await Link.findOne({
      user: req.user._id,
      _id: req.params.id,
    });
    if (!link) {
      return res.status(404).send();
    }
    const deletedLink = await link.deleteOne();
    return res.send(deletedLink);
  } catch (error) {
    console.log(error);
    if (error.name === 'CastError') {
      return res.status(404).send({
        message: 'CastError',
      });
    }
    console.log(error);
    return res
      .status(500)
      .send('Error while deleting a link. Try again later.');
  }
};

module.exports = {
  getLinks,
  updateLinks,
  deleteLink,
};
