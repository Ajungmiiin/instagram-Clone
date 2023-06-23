const User = require("../models/User")
const fileHandler = require('../utils/fileHandler')
const {body ,validationResult} = require('express-validator')

const isValidUsername = () => body('username')
  .trim()
  .isLength({ min: 5 }).withMessage('Username must be at least 5 characters')
  .isAlphanumeric().withMessage("Username is only allowed in alphabet and number.")

const isValidEmail = () => body('email')
  .trim()
  .isEmail().withMessage('E-mail is not valid')

const isValidPassword = () => body('password')
  .trim()
  .isLength({ min: 5 }).withMessage('Password must be at least 5 characters')

const emailInUse = async (email) => {
  const user = await User.findOne({ email });
  if (user) {
    return Promise.reject('E-mail is already in use');
  }
}

const usernameInUse = async (username) => {
  const user = await User.findOne({ username });
  if (user) {
    return Promise.reject('Username is already in use');
  }
}

const doesEmailExists = async (email) => {
  const user = await User.findOne({ email });
  if (!user) {
    return Promise.reject('User is not found');
  }
}

const doesPasswordMatch = async (password, { req }) => {
  const email = req.body.email;
  const user = await User.findOne({ email });
  if (!user.checkPassword(password)) {
    return Promise.reject('Password does not match');
  }
}

// 회원가입
exports.create = [
  isValidUsername().custom(usernameInUse),
  isValidEmail().custom(emailInUse),
  isValidPassword(),
  async (req, res, next) => {
    try {

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        const err = new Error();
        err.errors = errors.array();
        err.status = 400;
        throw err;
      }

      const { email, fullName, username, password } = req.body;

      const user = new User();

      user.email = email;
      user.fullName = fullName;
      user.username = username;
      user.setPassword(password);

      await user.save();

      res.json({ user });

    } catch (error) {
      next(error)
    }
  }
]

// 정보 수정
exports.update = [
  // 프로필 사진(파일) 처리
   fileHandler('profiles').single('avatar'),
   // 유효성 검사
   // 입력데이터가 있을 경우 유효성 검사
  isValidUsername().custom(usernameInUse).optional(),
  isValidEmail().custom(emailInUse).optional(),
  async(req, res, next) => {
    try { // 유효성 검사 결과
      const errors = validationResult(req);

      // 검사 실패
      if (!errors.isEmpty()) {
        const err = new Error();
        err.errors = errors.array();
        err.status = 400; // 400 Bad Request
        throw err
      }

      // req.user: 로그인 유저
      const _user = req.user;

      // 프로필 사진을 업로드한 경우
      if (req.file) { // req.file : 클라이언트가 전송한 파일
        _user.avatar = req.file.filename;
      }
      // 로그인 유저의 정보 중 클라이언트가 수정 요청을 한 정보만 업데이트한다
      Object.assign(_user, req.body);

      await _user.save() // 변경사항을 저장한다

      // 토큰을 재발급한다
      const token = _user.generateJWT()

      const user = {
        username: _user.username,
        email: _user.emil,
        fullName: _user.fullName,
        avatar: _user.avatar,
        bio: _user.bio,
        token
      }
      // 업데이트한 유저와 토큰을 전송한다
      res.json({user})

    } catch (error) {
      next(error)
    }
  }
]

// 로그인
exports.login = [
  isValidEmail().custom(doesEmailExists),
  isValidPassword().custom(doesPasswordMatch),
  async (req, res, next) => {
    try {

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        const err = new Error();
        err.errors = errors.array();
        err.status = 401;
        throw err;
      }

      const { email } = req.body;

      const _user = await User.findOne({ email });

      const token = _user.generateJWT();
  
      const user = {
        username: _user.username,
        email: _user.email,
        fullName: _user.fullName,
        avatar: _user.avatar,
        bio: _user.bio,
        token
      }
  
      res.json({ user })
  
    } catch (error) {
      next(error)
    }
  }
]