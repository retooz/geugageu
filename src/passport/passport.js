const passport = require('passport');
const conn = require('../../config/database')
const queries = require('../queries/userQueries')
const { selectUserById } = queries
const LocalStrategy = require('passport-local').Strategy
const KakaoStrategy = require('passport-kakao').Strategy

passport.use(new LocalStrategy(
    { usernameField: 'user_id', passwordField: 'user_pw' },
    async (user_id, user_pw, done) => {
        try {
            const [userRows] = await conn.query(selectUserById, [user_id, user_pw])
            const user = userRows[0]

            if (!user) {
                return done(null, false, { message: '입력한 정보와 일치하는 회원이 없습니다.' })
            }
            return done(null, user)
        } catch (err) {
            console.log(err)
            return done(err)
        }
    }
))

passport.use(new KakaoStrategy(

))

// 사용자 정보를 세션에 저장하는 serializeUser 함수를 설정합니다.
passport.serializeUser((user, done) => {
    done(null, user.user_id); // 수정된 부분: 사용자 정보 중 이메일만 세션에 저장합니다.
});

//세션에서 사용자 정보를 복원하는 deserializeUser 함수를 설정합니다.
passport.deserializeUser(async (id, done) => {
    try {
        // 여기서는 이메일만으로 사용자 객체를 만듭니다. 실제로는 DB 등에서 사용자 정보를 조회하여 사용자 객체를 만들어야 합니다.
        const user = { user_id: id };
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});
module.exports = passport;