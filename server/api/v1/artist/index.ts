import express from "express";
import { uploadMiddleware } from "../../../middlewares/file-upload";
import controller from "./artist.controller";

const router = express.Router();

router.get('/', controller.get);
router.get('/:id', controller.getById);
router.get('/myArtist/current/list', controller.getMyArtist);
router.post('/', controller.post);
router.post('/profile', uploadMiddleware().single('file'), controller.postWithImage);
router.put('/:id', controller.update);
router.put('/profile/:id', uploadMiddleware().single('file'), controller.updateWithProfile);
router.put('/addToMyArtist/:id', controller.addToMyArtist);
router.delete('/:id', controller.delete);

export default router;
