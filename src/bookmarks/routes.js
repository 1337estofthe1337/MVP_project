import { Router } from 'express';
import { getUsers, getGames, addUser, removeUser, updateUser } from './controller.js';

const router = Router();

//display list of users
router.get('/', getUsers);
//display list of games for user
router.get('/:username', getGames);
//display game info for game for user
// router.get('/:username/:gametitle', getGame);
//
router.post('/', addUser);
// router.post('/:username/:gametitle', postGame);
// router.post('/:username/:gametitle/:infoid', postGameInfo);
//
router.put('/:username', updateUser);
// router.put('/:username/:gametitle', putGame);
// router.put('/:username/:gametitle/:infoid', putGameInfo);
//
router.delete('/:username', removeUser);
// router.delete('/:username/:gametitle', deleteGame);
// router.delete('/:username/:gametitle/:infoid', deleteGameInfo);

export default router;
