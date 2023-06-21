const User = require('../models/User')
const Follow = require('../models/Follow')
const Article = require('../models/Article')
const Favorite = require('../models/Favorite')
const fileHandler = require('../utils/fileHandler')

// 피드 가져오기
exports.feed = async(req, res, next) => {}

// 게시물 가져오기
exports.find = async(req, res, next) => {}

// 게시물 한 개 가져오기
exports.findOne = async(req, res, next) => {}

// 게시물 업로드
exports.create = []

// 게시물 삭제
exports.delete = async(req, res, next) => {}

// 좋아요
exports.favorite = async(req, res, next) => {}

// 좋아요 취소
exports.unfavorite = async(req, res, next) => {}