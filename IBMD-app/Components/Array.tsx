import {MovieShow,CastMember,MovieItem1,ReviewItem,NotificationItem,ReviewItem1} from '../Types/types';

 const moviesShows: MovieShow[] = [
    {
      id: '1',
      title: 'Hawkeye', 
      image: 'https://cdn.marvel.com/content/1x/hawkeye_lob_crd_04.jpg',
    },
    {
      id: '2',
     title: 'Thor: Love and Thunder', 
      image: 'https://m.media-amazon.com/images/M/MV5BZjRiMDhiZjQtNjk5Yi00ZDcwLTkyYTEtMDc1NjdmNjFhNGIzXkEyXkFqcGc@._V1_.jpg'
    },
    {
      id: '3',
      title: 'The Lord of the Rings', 
      image: 'https://tolkiengateway.net/w/images/thumb/5/5e/The_Lord_of_the_Rings_-_The_Return_of_the_King_-_Ensemble_poster.jpg/640px-The_Lord_of_the_Rings_-_The_Return_of_the_King_-_Ensemble_poster.jpg'
    },
    {
      id: '4',
      title: 'Avengers', 
      image: 'https://images1.wionews.com/images/ZB-EN/900x1600/2023/5/5/1683302779303_AvengersAgeofUltron.jpg' 
    },
    {
      id: '5',
      title: "The Boys",
      image: 'https://cdnb.artstation.com/p/assets/images/images/031/128/313/large/mayank-kumarr-2.jpg?1602685224',
    },
    {
      id: '6',
      title: 'The Shark Tank',
      image: 'https://qph.cf2.quoracdn.net/main-qimg-0cbe18cdabc9cab371089a18442a38b2-lq',
    },
  ];



  const castMembers: CastMember[] = [
    {
      id: '1',
      name: 'Matt Smith',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWs8GpphRGVgQ4CffAMw1P2kzqoG476UZZww&s',
    },
    {
      id: '2',
      name: 'Rhys Ifans',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBtwykPdiWdC3SvUDTr-RFEiaJN7eHs9nsLg&s',
    },
    {
      id: '3',
      name: 'Fabien Frankel',
      image: 'https://m.media-amazon.com/images/M/MV5BZWZhNjllZGYtN2JlOS00Nzc5LTkyODUtMzlkN2Y0ODQ3YWE3XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg',
    },
    {
      id: '4',
      name: 'Bill Paterson',
      image: 'https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/75970_v9_bb.jpg',
    },
    {
      id: '5',
      name: 'Emma D\'Arcy',
      image: 'https://upload.wikimedia.org/wikipedia/commons/3/3f/Emma_D%27Arcy.jpg',
    },
    {
      id: '6',
      name: 'Olivia Cooke',
      image: 'https://m.media-amazon.com/images/M/MV5BYTBmMzEwYmItZThlOC00YzIxLWJlZTEtMmEzNjkwNDE0MzY0XkEyXkFqcGc@._V1_.jpg',
    },
    {
      id: '7',
      name: 'Bethany Antonia',
      image: 'https://m.media-amazon.com/images/M/MV5BYTc4YTEzMmQtYzY1Mi00ZTBmLWEzY2EtYWNjODcxNTQxMzRhXkEyXkFqcGc@._V1_.jpg',
    },
    {
      id: '8',
      name: 'Phoebe Campbell',
      image: 'https://ntvb.tmsimg.com/assets/assets/994373_v9_bd.jpg',
    },
    {
      id: '9',
      name: 'Tom Glynn-Carney',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpllLwjFY-Nv4UahHBLuXQgSd4gXVSuDj7Zw&s',
    },
    {
      id: '10',
      name: 'Ewan Mitchell',
      image: 'https://m.media-amazon.com/images/M/MV5BMDk2NGYyMmUtZDA2YS00YTI3LTk3ODYtMTM0YzdiNTg0OTg3XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg',
    },
    {
      id: '11',
      name: 'Harry Collett',
      image: 'https://m.media-amazon.com/images/M/MV5BYWYzYzFjNGEtN2MxYy00YTQ0LWFmMWItZTRjZjNmNjZkMGIzXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg',
    },
    {
      id: '12',
      name: 'Phia Saban',
      image: 'https://ntvb.tmsimg.com/assets/assets/1760949_v9_aa.jpg',
    },
    {
      id: '13',
      name: 'Ty Tennant',
      image: 'https://ntvb.tmsimg.com/assets/assets/1245078_v9_bb.jpg',
    },
    {
      id: '14',
      name: 'Eve Best',
      image: 'https://i2-prod.manchestereveningnews.co.uk/article24853390.ece/ALTERNATES/s1200b/0_evabest.jpg',
    },
    {
      id: '15',
      name: 'Steve Toussaint',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwIcguHpWn-F9l1yv-u8ppIjGBY5QKJAvayg&s',
    },
    {
      id: '16',
      name: 'Anthony Flanagan',
      image: 'https://m.media-amazon.com/images/M/MV5BODg3NDkzMDIwN15BMl5BanBnXkFtZTgwNzMyMDUyODE@._V1_.jpg',
    },
    {
      id: '17',
      name: 'Robert Rhodes',
      image: 'https://pbs.twimg.com/media/GSm1BEZXEAApjwE.jpg:large',
    },
    {
      id: '18',
      name: 'Kurt Egyiawan',
      image: 'https://images.mubicdn.net/images/cast_member/532208/cache-394249-1543802058/image-w856.jpg',
    },
    {
      id: '19',
      name: 'Abubakar Salim',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0IDclnA1n9LQSZ4TkfucqmdHo5n_FNiJGQQ&s',
    },
    {
      id: '20',
      name: 'Elliott Tittensor',
      image: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Gallery_showbiz-elliott-tittensor.jpg',
    },
  ];

    const relatedMovies: MovieItem1[] = [
    {
      id: '1',
      title: 'Avengers', 
      image: 'https://images1.wionews.com/images/ZB-EN/900x1600/2023/5/5/1683302779303_AvengersAgeofUltron.jpg' ,
    },
    {
      id: '2',
     title: 'Maleficent', 
      image: 'https://photogallery.indiatimes.com/movies/international/maleficent/photo/35618380/Poster-of-Hollywood-dark-fantasy-adventure-film-Maleficent-starring-Angelina-Jolie-.jpg' ,
    },
    {
      id: '3',
      title: 'Jumanji', 
      image: 'https://qqcdnpictest.mxplay.com/pic/bce7ae02445dad432bdab581e180ceef/en/2x3/312x468/d5f863cd13cc307123989701f8b72fdf_1280x1920.webp' ,
    },
    {
      id: '4',
     title: 'Hawkeye', 
      image: 'https://cdn.marvel.com/content/1x/hawkeye_lob_crd_04.jpg' ,
    },
  ];

  const reviews: ReviewItem[] = [
    {
      id: '1',
      userName: 'Jane Alexandre',
      userImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
      review: 'Carrying the nostalgia of Game of thrones into this and comparing everything with the original...I would say this looks pretty awesome and you get the feel of watching original game of thrones... Its the same but different characters.',
      rating: 'Promising',
    },
    {
      id: '2',
      userName: 'Jane Alex',
      userImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
      review: 'Carrying the nostalgia of Game of thrones into this and comparing everything with the original...I would say this looks pretty awesome and you get the feel of watching original game of thrones... Its the same but different characters.',
      rating: 'Promising',
    },
    {
      id: '3',
      userName: 'Jane Alexandre',
      userImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
      review: 'Carrying the nostalgia of Game of thrones into this and comparing everything with the original...I would say this looks pretty awesome and you get the feel of watching original game of thrones... Its the same but different characters.',
      rating: 'Promising',
    },
  ];

 const notifications: NotificationItem[] = [
    {
      id: '1',
      title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      timeAgo: '1min ago',
      image: 'https://akns-images.eonline.com/eol_images/Entire_Site/20191019/rs_634x941-191119145917-634-Jumanji-Next-Level-CE-111919.jpg?fit=around%7C776:1152&output-quality=90&crop=776:1152;center,top',
      iconType: 'video',
    },
    {
      id: '2',
      title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      timeAgo: '1min ago',
      image: 'https://www.tallengestore.com/cdn/shop/products/JohnWick-KeanuReeves-HollywoodEnglishActionMoviePoster-2_1eac59c5-8747-4ce2-937b-4b916be044cc.jpg?v=1649071607',
      iconType: 'image',
    },
    {
      id: '3',
      title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      timeAgo: '1min ago',
      image: 'https://qqcdnpictest.mxplay.com/pic/bce7ae02445dad432bdab581e180ceef/en/2x3/312x468/d5f863cd13cc307123989701f8b72fdf_1280x1920.webp',
      iconType: 'file',
    },
    {
      id: '4',
      title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      timeAgo: '1min ago',
      image: 'https://photogallery.indiatimes.com/movies/international/maleficent/photo/35618380/Poster-of-Hollywood-dark-fantasy-adventure-film-Maleficent-starring-Angelina-Jolie-.jpg',
      iconType: 'clock',
    },
    {
      id: '5',
      title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      timeAgo: '1min ago',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1eMB1HN8ut1txQhRvTs1jJ0nCdcgQG43WXg&s',
      iconType: 'heart',
    },
    {
      id: '6',
      title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      timeAgo: '1min ago',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNHbiynGddWiwSXEmfcjw1vlNdyE0zjYIMfQ&s',
      iconType: 'video',
    },
  ];

  const reviews1: ReviewItem1[] = [
    {
      id: '1',
      userName: 'Jane Alexandre',
      userImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_HFQbK0SjP6lVSn7FUknx5MVcXFb5GOW0sA&s',
      review: 'Carrying the nostalgia of Game of thrones into this and comparing everything with the original...I would say this looks pretty awesome and you get the feel of watching original game of thrones... Its the same but different characters..',
      rating: 'Promising',
    },
    {
      id: '2',
      userName: 'Jane Alexandre',
      userImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_HFQbK0SjP6lVSn7FUknx5MVcXFb5GOW0sA&s',
      review: 'Carrying the nostalgia of Game of thrones into this and comparing everything with the original...I would say this looks pretty awesome and you get the feel of watching original game of thrones... Its the same but different characters..',
      rating: 'Promising',
    },
    {
      id: '3',
      userName: 'Jane Alexandre',
      userImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_HFQbK0SjP6lVSn7FUknx5MVcXFb5GOW0sA&s',
      review: 'Carrying the nostalgia of Game of thrones into this and comparing everything with the original...I would say this looks pretty awesome and you get the feel of watching original game of thrones... Its the same but different characters..',
      rating: 'Promising',
    },
    {
      id: '4',
      userName: 'Jane Alexandre',
      userImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_HFQbK0SjP6lVSn7FUknx5MVcXFb5GOW0sA&s',
      review: 'Carrying the nostalgia of Game of thrones into this and comparing everything with the original...I would say this looks pretty awesome and you get the feel of watching original game of thrones... Its the same but different characters..',
      rating: 'Promising',
    },
    {
      id: '5',
      userName: 'Jane Alexandre',
      userImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_HFQbK0SjP6lVSn7FUknx5MVcXFb5GOW0sA&s',
      review: 'Carrying the nostalgia of Game of thrones into this and comparing everything with the original...I would say this looks pretty awesome and you get the feel of watching original game of thrones... Its the same but different characters..',
      rating: 'Promising',
    },
    {
      id: '6',
      userName: 'Jane Alexandre',
      userImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_HFQbK0SjP6lVSn7FUknx5MVcXFb5GOW0sA&s',
      review: 'Carrying the nostalgia of Game of thrones into this and comparing everything with the original...I would say this looks pretty awesome and you get the feel of watching original game of thrones... Its the same but different characters..',
      rating: 'Promising',
    },
  ];


export { moviesShows, castMembers, relatedMovies, reviews, notifications,reviews1 };
