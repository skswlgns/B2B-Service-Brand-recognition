import axios from 'axios'
import cookies from 'vue-cookies'
const config = {
  headers: { token: cookies.get('token'), company_id: cookies.get('companyId') }
}
const API_SERVER_URL = process.env.VUE_APP_API_SERVER_URL

const videoDetailStore = {
  namespaced: true,
  state: {
    videoData: {},
    player: {},
    recommendVideos: [
      {
        scrap_company_id: ['5fa21832cdf2df2d446a193d'],
        exception_company_id: [],
        _id: '5fa2b44a6e3b4d138cd245ff',
        video_url: 'https://www.youtube.com/watch?v=rr7MHqti8HM',
        channel_id: '5fa2a752abea2048443a4375',
        video_youtube_id: 'rr7MHqti8HM',
        video_title: '눌러 가며 닦고 있니?? LG 코드제로 M9 씽큐 프리뷰 [4K]',
        video_content:
          '- 본 영상을 제품을 소개하면서 LG전자로부터 원고료를 제공받았습니다.\n\n- 자세한 사진은 https://bit.ly/38djkEG\n- LG전자의 새 물걸레 전용 청소기, 코드제로 M9 씽큐입니다!\n흡입 대신 물걸레에만 집중해서, 음향 파워 레벨 기준 44db로 조용하게 꼬물꼬물 움직입니다. 그러면서 그냥 훑고만 지나가는 것 같은 겸용 모델과 달리 최대 2kg의 힘으로 세게 닦는 것이 특징이죠.\n\n깨끗이 닦는 청소 능력 자체가 제일 마음에 들었는데, 장애물 회피 민감도 조절이나 예약 시간 전에 미리 걸레를 적셔 놓는 기능, 그리고 LED 밝기 조절까지 제어할 수 있는 세심함도 좋습니다. 거기에 앱을 굳이 켤 필요 없이 거치대까지 포함된 리모콘이 제공되는 점이 역시 가전 경력 오래 된 LG답다 싶더라고요.\n\n다만 밀착해서 닦는 특성 상 못 넘는 문턱이 있을 수 있고, 출고가 기준 699,000원의 가격이 좀 부담될 수 있다는 점은 아쉽습니다.\n\n-페이스북 http://facebook.com/underkg\n-인스타그램 http://instagram.com/underkgshow',
        video_views: 11113,
        video_like: 487,
        video_dislike: 19,
        video_date: '2020-11-04T10:05:30Z',
        video_record: [
          {
            company_id: '5fa2184bcdf2df2d446a1941',
            total_exposure_time: 3000,
            timelines: [
              [['logo'], 0, 2],
              [['logo'], 6, 7],
              [['logo'], 8, 9]
            ]
          },
          {
            company_id: '5fa2183bcdf2df2d446a193f',
            total_exposure_time: 2000,
            timelines: [
              [['logo'], 3, 6],
              [['logo'], 7, 10]
            ]
          },
          {
            company_id: '5fa21832cdf2df2d446a193d',
            total_exposure_time: 1000,
            timelines: [[['logo'], 9, 12]]
          }
        ],
        video_thumbnails: 'https://i.ytimg.com/vi/rr7MHqti8HM/mqdefault.jpg',
        video_time: 13,
        __v: 0,
        video_category: 'IT'
      },
      {
        scrap_company_id: ['5fa21832cdf2df2d446a193d'],
        exception_company_id: [],
        _id: '5fa7a6c9748dce28c45b62a2',
        video_url: 'https://www.youtube.com/watch?v=kvhRhhBB5-k',
        channel_id: '5fa2a752abea2048443a4375',
        video_youtube_id: 'kvhRhhBB5-k',
        video_title: '넣을 것 다 넣고 45만원 싸다? 갤럭시 S20 FE 5G 개봉기 [4K]',
        video_content:
          '- 바로 구매는 https://coupa.ng/bLoo5Y\n- 위의 추천인 링크를 통해 구매시, 저희에게 일정액의 수수료가 제공될 수 있습니다!\n\n- 자세한 사진은 https://bit.ly/2SWWTef\n- 120Hz 주사율, IP68 방수/방진, 듀얼 OIS, Snapdragon 865, 25W 고속 충전, 고속 무선 충전 2.0에 역 무선 충전까지 넣고도 899,800원의 갤럭시 S20 FE 5G입니다!\n\n다만 베젤이 좀 두꺼운 것 까지는 괜찮은데 이 가격에 강화 유리가 아니라 플라스틱 후면이고, 고릴라 글라스 3을 쓴 데다가 터치 인식과 한지 현상 얘기까지 들려서 불안하기는 합니다;;;\n\n-페이스북 http://facebook.com/underkg\n-인스타그램 http://instagram.com/underkgshow',
        video_views: 269369,
        video_like: 3481,
        video_dislike: 160,
        video_date: '2020-10-16T10:20:15Z',
        video_record: [
          {
            company_id: '5fa21864cdf2df2d446a1942',
            total_exposure_time: 59,
            timelines: [
              [['logo'], 0, 5],
              [['logo'], 17, 34],
              [['logo'], 115, 117],
              [['logo'], 141, 146],
              [['logo'], 217, 225],
              [['logo'], 247, 257],
              [['logo'], 270, 277],
              [['logo'], 277, 282]
            ]
          },
          {
            company_id: '5fa2187acdf2df2d446a1947',
            total_exposure_time: 2,
            timelines: [[['logo'], 197, 199]]
          }
        ],
        video_thumbnails: 'https://i.ytimg.com/vi/kvhRhhBB5-k/mqdefault.jpg',
        video_time: 565,
        video_category: '과학/기술',
        __v: 0
      }
    ]
  },
  mutations: {
    // videoData 넣어주기
    setVideoData(state, data) {
      state.videoData = data
    },
    setPlayerObject(state, data) {
      state.player = data
    }
  },
  actions: {
    // 스크랩 하기/취소
    async scrap({ commit }, id) {
      const body = {
        _id: id
      }
      const res = await axios.put(`${API_SERVER_URL}/video/scrap`, body, config)
      if (res.data.message === '채널 스크랩 완료' || res.data.message === '채널 스크랩 취소') {
        alert('스크랩 완료 || 취소 완료')
      }
    },
    // videoData API
    async getVideoData({ commit }, videoYoutubeId) {
      const response = await axios.get(`${API_SERVER_URL}/video/youtube/${videoYoutubeId}`)
      commit('setVideoData', response.data)
    },

    // recommendVideos API

    // player Object
    makePlayerElement({ commit }, videoYoutubeId) {}
  }
}

export default videoDetailStore
