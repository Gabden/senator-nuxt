import banner from '@/assets/banner/smartbanner.min.js'
export default ({ app }, inject) => {
    inject('banner', () => console.log(banner))
  }