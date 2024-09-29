import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function SwiperNav() {
    const slides = [
        { id: 1, src: "https://www.nilkamalfurniture.com/cdn/shop/files/The-Great-Furniture-Fest-banner_bedroom_b13a1939-547c-45b6-85c1-d6fe33ed6870.gif?v=1727410420", alt: "Slide 1" },
        { id: 2, src: "https://www.nilkamalfurniture.com/cdn/shop/files/The-Great-Furniture-Fest-banner_living_fdd74ae2-8b3e-44a2-93c0-4eab74d05f61.gif?v=1727410406", alt: "Slide 2" },
        { id: 3, src: "https://www.nilkamalfurniture.com/cdn/shop/files/The-Great-Furniture-Fest-banner_dining_cc7062d5-8376-44a0-8cac-fb1ff29adc0c.gif?v=1727410437", alt: "Slide 3" },
        { id: 4, src: "https://www.nilkamalfurniture.com/cdn/shop/files/The-Great-Furniture-Fest-banner_office_e3a2b1d7-e4ca-48cf-b452-9587c202c7de.gif?v=1727410473", alt: "Slide 4" },
    ];

    return (
        <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={30}
            pagination={{
                clickable: true,
            }}
            loop={true}
            navigation
            style={{ width: '100%', height: '500px' }}
        >
            {slides.map(slide => (
                <SwiperSlide key={slide.id}>
                    <img 
                        src={slide.src} 
                        alt={slide.alt} 
                        style={{ width: '100%', height: '100%', objectFit: 'fill' }} 
                    />
                </SwiperSlide>
            ))}
        </Swiper>
    );
}
