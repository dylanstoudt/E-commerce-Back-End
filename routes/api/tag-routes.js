const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  Tag.findAll({
    // include its associated Product data
    include: [{ model: Product }]
  }).then((tagData) => {
    res.json(tagData)
  })
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  Tag.findByPk(req.params.id, {
    // include its associated Product data
    include: [{ model: Product}]
  })
    .then((tagData) => {
    res.json(tagData)
  });
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create(req.body)
  .then((newTag) => {
    res.json(newTag);
  })
  .catch((err) => {
    res.json(err)
  })
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(
    {
      tag_name: req.body.tag_name
    },
    {
      // check params to verify which tag to updates
      where: {
        id: req.params.id
      }
    }
  )
    .then((updatedTag) => {
      res.json(updatedTag)
    })
    .catch((err) => res.json(err))
});

router.delete('/:id', (req, res) => {
  // delete tag based off ID
  Tag.destroy({
      // check params to verify which tag to updates
      where:{
      id: req.params.id
    }
  })
  .then((deletedTag) => {
    res.json(deletedTag);
  })
  .catch((err) => res.json(err))
});

module.exports = router;
