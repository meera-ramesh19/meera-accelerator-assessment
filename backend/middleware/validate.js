
const positiveIntegerRegex = /^[1-9]\d*$/;

const validateAnime = (req, res, next) => {
    const { name, description } = req.body;
  
    
  if (!name || !description || typeof name !== 'string' || typeof description !== 'string' || name.length === 0 || description.length === 0) {
    res.status(400).json({ message: 'Name and description are required and must be non-empty strings', success: false });
  }
    next();
  };


const validateId = (req, res, next) => {
    const { id } = req.params;
  
    if (positiveIntegerRegex.test(id)) {
      next();
    } else {
      res.status(400).send({
        message:
          'Invalid ID. ID must be a positive integer with no decimal values.',
      });
    }
  };

  module.exports = {
    validateId,
    validateAnime
    
  };