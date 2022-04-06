export const state = () => ({
  centers: [],
  showDescription: [],
  monthShortName: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  createBooking: {
    fromTime: '',
    toTime: '',
    type: '',
    ratePlan: '',
    bookedQuantity: '',
    totalRate: '',
    totalDiscount: '',
    totalTax: ''
  },
  userView: true,
  googleapikey: 'AIzaSyCiLXGaYak900xP8DJXqsslSxLBFRD_hb0'
})

export const mutations = {
  addCenters (state, centers) {
    state.centers = centers
    state.showDescription = []
    state.centers.forEach((element) => {
      state.showDescription.push(false)
    })
  },
  createBooking (state, createBooking) {
    state.createBooking = createBooking
  },
  clearState (state) {
    state.centers = []
  },
  checkHost (state, userView) {
    if (userView === 'host') {
      state.userView = false
    } else {
      state.userView = true
    }
  }
}

export const actions = {
  async login (state, { email, password }) {
    const { data } = await this.$auth.loginWith('local', { data: { email, password } })
    return data
  }
}
