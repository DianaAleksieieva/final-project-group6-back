// import express from 'express';
// import { contacts } from '../../controllers/index.js';
// import { authMiddleware, validationMiddleware, ctrlWrapperMiddleware } from '../../middlewares/index.js';
// import { joiSchema, isFavoriteJoiSchema } from '../../models/contact.js';
// const { getAll, getById, add, deletebyId, updateById, updateIsFavorite } =
//   contacts.contactsCtrl;
// const router = express.Router();

// router.get('/', authMiddleware, ctrlWrapperMiddleware(getAll));

// router.get('/:id', ctrlWrapperMiddleware(getById));

// router.post('/', authMiddleware, validationMiddleware(joiSchema), ctrlWrapperMiddleware(add));

// router.delete('/:contactId', ctrlWrapperMiddleware(deletebyId));

// router.put('/:contactId', validationMiddleware(joiSchema), ctrlWrapperMiddleware(updateById));

// router.patch(
//   '/:contactId/favorite',
//   validationMiddleware(isFavoriteJoiSchema),
//   ctrlWrapper(updateIsFavorite),
// );

// export default router;
