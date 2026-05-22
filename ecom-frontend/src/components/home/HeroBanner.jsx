// Import Swiper styles
import 'swiper/css';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import {Autoplay,EffectFade,Navigation,Pagination} from 'swiper/modules'
import { bannerList } from '../../utils';

const colors = ["bg-banner-color1","bg-banner-color2","bg-banner-color3"]

const HeroBanner = () => {

    return (
        <div className='py-2 round-md'>
            <Swiper
                    grabCursor = {true} //Manito
                    autoplay={{
                        delay:4000,
                        disableOnInteraction: false
                    }}
                    navigation
                    modules={[Pagination, EffectFade,Navigation,Autoplay]}
                    pagination={{clickable:true}}
                    scrollbar={{draggable:true}}
                    slidesPerView={1}>

                        {bannerList.map((item,i) => (
                            <SwiperSlide key={i}>
                                <div className={`carousel-item rounded-md sm:h-125 h-96 ${colors[i]}`}>
                                    <div className='flex items-center justify-center'>
                                        <div className='text-center'>
                                            <h3 className='text-3xl text-white font-bold'>
                                                {item.title}
                                            </h3>
                                            <h1 className='text-5xl text-white font-bold mt-2'>

                                            </h1>

                                        </div>

                                    </div>

                                </div>
                            </SwiperSlide>

                        ))}
                
            </Swiper>

        </div>
    )
}

export default HeroBanner;