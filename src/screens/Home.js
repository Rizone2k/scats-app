import React from 'react';
import { View, Text, Button, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import Header from '../components/Header';
import Slide from '../components/SlideBanner/Slide';

const data = [
    {
        "id": 1,
        "name": "She Hulk",
        "slug": "she-hulk",
        "aka": "She-Hulk: Attorney at Law | NỮ KHỔNG LỒ XANH",
        "content": "<p>Jennifer Walters điều hướng cuộc sống phức tạp của một luật sư 30 tuổi độc thân, đồng thời cũng là một gã khổng lồ siêu cường cao 6 feet 7 inch màu xanh lá cây.</p>",
        "thumb": "https://drive.google.com/uc?id=1CXh3Q-AMkaPHMaHfNylmHGO9NFA7Tk0I",
        "background": "https://drive.google.com/uc?id=1e3LVGNVVZkmN8Nklg6VHG8qW7hbbY7vO",
        "viewed": 0,
        "liked": 0,
        "Genres": [
            {
                "id": 1,
                "name": "Hành Động",
                "slug": "hanh-dong",
                "GenreMovie": {
                    "MovieId": 1,
                    "GenreId": 1
                }
            },
            {
                "id": 2,
                "name": "Phiêu Lưu",
                "slug": "phieu-luu",
                "GenreMovie": {
                    "MovieId": 1,
                    "GenreId": 2
                }
            },
            {
                "id": 7,
                "name": "Hài Hước",
                "slug": "hai-huoc",
                "GenreMovie": {
                    "MovieId": 1,
                    "GenreId": 7
                }
            },
            {
                "id": 15,
                "name": "Khoa Học",
                "slug": "khoa-hoc",
                "GenreMovie": {
                    "MovieId": 1,
                    "GenreId": 15
                }
            },
            {
                "id": 21,
                "name": "Kịch Tính",
                "slug": "kich-tinh",
                "GenreMovie": {
                    "MovieId": 1,
                    "GenreId": 21
                }
            }
        ],
        "Country": {
            "id": 6,
            "name": "Mỹ",
            "slug": "my"
        },
        "Type": {
            "id": 1,
            "name": "Phim Bộ",
            "slug": "phim-bo"
        },
        "Status": {
            "id": 2,
            "name": "Hoàn Thành",
            "slug": "hoan-thanh"
        },
        "Year": {
            "id": 12,
            "name": "2022",
            "slug": "2022"
        }
    },
    {
        "id": 2,
        "name": "House of the Dragon",
        "slug": "house-of-the-dragon",
        "aka": "GIA TỘC RỒNG",
        "content": "<p>Là một phần tiền truyện sắp ra mắt của Game of Thrones . Nó được HBO đặt hàng vào tháng 10 năm 2019. Phần tiền truyện quay trở lại khoảng 200 năm xoay quanh sự khởi đầu của sự kết thúc của triều đại toàn năng từng thống trị Bảy Vương quốc Westeros.Phần tiền truyện Trò chơi vương quyền cho thấy triều đại Targaryen đang ở đỉnh cao sức mạnh tuyệt đối, với hơn 15 con rồng dưới ách của chúng. Hầu hết các đế chế - có thật và trong tưởng tượng - đều sụp đổ từ những đỉnh cao như vậy. Trong trường hợp của nhà Targaryens, sự sụp đổ chậm chạp của họ bắt đầu từ gần năm 193 nhiều năm trước các sự kiện của Game of Thrones , khi Vua Viserys Targaryen phá vỡ truyền thống thế kỷ bằng cách đặt tên con gái mình là Rhaenyra người thừa kế ngai vàng. Nhưng khi Viserys sau này có một đứa con trai, cả triều đình đã bị sốc khi Rhaenyra vẫn giữ tư cách là người thừa kế của ông. , và hạt giống của sự chia rẽ gieo rắc xích mích trên toàn cõi</p>",
        "thumb": "https://drive.google.com/uc?id=1kPkyM6GpykBFDcfA_TIMRE6MpsPwGrTL",
        "background": "https://drive.google.com/uc?id=1t791r3z_Q-1P3ffyjBR9G3sAltaFo_RB",
        "viewed": 0,
        "liked": 0,
        "Genres": [
            {
                "id": 1,
                "name": "Hành Động",
                "slug": "hanh-dong",
                "GenreMovie": {
                    "MovieId": 2,
                    "GenreId": 1
                }
            },
            {
                "id": 2,
                "name": "Phiêu Lưu",
                "slug": "phieu-luu",
                "GenreMovie": {
                    "MovieId": 2,
                    "GenreId": 2
                }
            },
            {
                "id": 9,
                "name": "Viễn Tưởng",
                "slug": "vien-tuong",
                "GenreMovie": {
                    "MovieId": 2,
                    "GenreId": 9
                }
            },
            {
                "id": 21,
                "name": "Kịch Tính",
                "slug": "kich-tinh",
                "GenreMovie": {
                    "MovieId": 2,
                    "GenreId": 21
                }
            }
        ],
        "Country": {
            "id": 6,
            "name": "Mỹ",
            "slug": "my"
        },
        "Type": {
            "id": 1,
            "name": "Phim Bộ",
            "slug": "phim-bo"
        },
        "Status": {
            "id": 2,
            "name": "Hoàn Thành",
            "slug": "hoan-thanh"
        },
        "Year": {
            "id": 12,
            "name": "2022",
            "slug": "2022"
        }
    },
    {
        "id": 3,
        "name": "Chúa Tể Của Những Chiếc Nhẫn: Những Chiến Nhẫn Toàn Năng",
        "slug": "chua-te-cua-nhung-chiec-nhan-nhung-chien-nhan-toan-nang",
        "aka": "The Lord of the Rings: The Rings of Power",
        "content": "<p>CLoạt phim những chiến nhẫn toàn năng này lần đầu tiên đưa lên màn ảnh những truyền thuyết anh hùng trong lịch sử Huyền thoại thứ hai của Trung Địa. Bộ phim sử thi này lấy bối cảnh hàng nghìn năm trước các sự kiện trong \"Người Hobbit\" và \"Chúa tể của những chiếc nhẫn\" của JRR Tolkien và đưa người xem trở lại thời đại mà sức mạnh vĩ đạiđược rèn giũa, các vương quốc vươn lên vinh quang rồi sụp đổ, những anh hùng khó có khả năng bị thử thách, hy vọng bị treo bởi những sợi tơ tốt nhất và kẻ phản diện vĩ đại nhất từng tuôn trào từ ngòi bút của Tolkien, đe dọa bao trùm cả thế giới trong bóng tối. Bắt đầu trong một thời kỳ hòa bình tương đối, bộ phim theo chân một nhóm nhân vật, cả quen thuộc và mới, khi họ đối đầu với sự tái hợp đáng sợ từ lâu của cái ác đến Trung Địa. Từ độ sâu tối tăm nhất của Dãy núi Sương mù, đến những khu rừng hùng vĩ của thủ đô Lindon, đến vương quốc đảo Númenor ngoạn mục, đến những vùng xa nhất của bản đồ, những vương quốc và nhân vật này đã tạo ra những di sản tồn tại lâu dài sau họ đã biến mất.Nếu bạn nghĩ đây là phim chúa tể của những chiếc nhẫn 4 thì chưa chắc vì đây là phần trước diễn biến của các tập trước.</p>",
        "thumb": "https://drive.google.com/uc?id=1bY-RRhI-H7md_vyzzAFdG7m0xVJPcoC4",
        "background": "https://drive.google.com/uc?id=1cqdblO8xmx38GYfra2OpkG8zGnDrBqTK",
        "viewed": 0,
        "liked": 0,
        "Genres": [
            {
                "id": 1,
                "name": "Hành Động",
                "slug": "hanh-dong",
                "GenreMovie": {
                    "MovieId": 3,
                    "GenreId": 1
                }
            },
            {
                "id": 2,
                "name": "Phiêu Lưu",
                "slug": "phieu-luu",
                "GenreMovie": {
                    "MovieId": 3,
                    "GenreId": 2
                }
            },
            {
                "id": 9,
                "name": "Viễn Tưởng",
                "slug": "vien-tuong",
                "GenreMovie": {
                    "MovieId": 3,
                    "GenreId": 9
                }
            },
            {
                "id": 21,
                "name": "Kịch Tính",
                "slug": "kich-tinh",
                "GenreMovie": {
                    "MovieId": 3,
                    "GenreId": 21
                }
            }
        ],
        "Country": {
            "id": 6,
            "name": "Mỹ",
            "slug": "my"
        },
        "Type": {
            "id": 1,
            "name": "Phim Bộ",
            "slug": "phim-bo"
        },
        "Status": {
            "id": 2,
            "name": "Hoàn Thành",
            "slug": "hoan-thanh"
        },
        "Year": {
            "id": 12,
            "name": "2022",
            "slug": "2022"
        }
    },
    {
        "id": 8,
        "name": "Phi Vụ Triệu Đô (Phần 5)",
        "slug": "phi-vu-trieu-do-phan-5",
        "aka": "Money Heist (Season 5)",
        "content": "<p><strong>Phi Vụ Triệu Đô (Phần 5)</strong> này kể về cả nhóm đã ở Ngân hàng Tây Ban Nha hơn 100 giờ và Giáo Sư đang gặp nguy. Tệ hơn nữa, họ sắp phải đối mặt với một kẻ địch mới: quân đội.</p>",
        "thumb": "https://drive.google.com/uc?id=1G9doGOaRxZIyNtYs9n-dC5rNNa081TB1",
        "background": "https://drive.google.com/uc?id=1Ps8sUiU4AI-FEBLpsBrtkaNckwSu61MD",
        "viewed": 0,
        "liked": 0,
        "Genres": [],
        "Country": {
            "id": 13,
            "name": "Tây Ban Nha",
            "slug": "tay-ban-nha"
        },
        "Type": {
            "id": 1,
            "name": "Phim Bộ",
            "slug": "phim-bo"
        },
        "Status": {
            "id": 2,
            "name": "Hoàn Thành",
            "slug": "hoan-thanh"
        },
        "Year": {
            "id": 11,
            "name": "2021",
            "slug": "2021"
        }
    },
    {
        "id": 15,
        "name": "Người Nhện: Trở Về Nhà",
        "slug": "nguoi-nhen-tro-ve-nha",
        "aka": "Spider-Man: Homecoming",
        "content": "<p>Peter Parker trở lại cuộc sống học sinh trung học thường ngày, đến khi sự xuất hiện của Kền Kền cho cậu cơ hội chứng minh mình là một siêu anh hùng biết giăng lưới.</p>",
        "thumb": "https://drive.google.com/uc?id=1OUw2IDa5hoIAyWBX7K5swWgvQtyJekWI",
        "background": "https://drive.google.com/uc?id=14UTYxZbcyD72YzDP7NZM-b3NQ8dNQ9_-",
        "viewed": 0,
        "liked": 0,
        "Genres": [
            {
                "id": 1,
                "name": "Hành Động",
                "slug": "hanh-dong",
                "GenreMovie": {
                    "MovieId": 15,
                    "GenreId": 1
                }
            },
            {
                "id": 2,
                "name": "Phiêu Lưu",
                "slug": "phieu-luu",
                "GenreMovie": {
                    "MovieId": 15,
                    "GenreId": 2
                }
            },
            {
                "id": 9,
                "name": "Viễn Tưởng",
                "slug": "vien-tuong",
                "GenreMovie": {
                    "MovieId": 15,
                    "GenreId": 9
                }
            },
            {
                "id": 15,
                "name": "Khoa Học",
                "slug": "khoa-hoc",
                "GenreMovie": {
                    "MovieId": 15,
                    "GenreId": 15
                }
            }
        ],
        "Country": {
            "id": 6,
            "name": "Mỹ",
            "slug": "my"
        },
        "Type": {
            "id": 2,
            "name": "Phim Lẻ",
            "slug": "phim-le"
        },
        "Status": {
            "id": 2,
            "name": "Hoàn Thành",
            "slug": "hoan-thanh"
        },
        "Year": {
            "id": 7,
            "name": "2017",
            "slug": "2017"
        }
    },
    {
        "id": 17,
        "name": "Người Nhện: Vũ Trụ Mới",
        "slug": "nguoi-nhen-vu-tru-moi",
        "aka": "Spider-Man: Into the Spider-Verse",
        "content": "<p>Miles Teen Morales trở thành người nhện của vũ trụ của mình, và phải tham gia với năm cá nhân chạy bằng nhện từ các khía cạnh khác để ngăn chặn mối đe dọa cho tất cả các thực tế.</p>",
        "thumb": "https://drive.google.com/uc?id=19mgxXKFyenq6lEPw9PMpfjOGAKgkXx20",
        "background": "https://drive.google.com/uc?id=1GZE0356BLceWuILS9XeLBhKZyp7rPl-w",
        "viewed": 0,
        "liked": 0,
        "Genres": [
            {
                "id": 1,
                "name": "Hành Động",
                "slug": "hanh-dong",
                "GenreMovie": {
                    "MovieId": 17,
                    "GenreId": 1
                }
            },
            {
                "id": 2,
                "name": "Phiêu Lưu",
                "slug": "phieu-luu",
                "GenreMovie": {
                    "MovieId": 17,
                    "GenreId": 2
                }
            },
            {
                "id": 5,
                "name": "Hoạt Hình",
                "slug": "hoat-hinh",
                "GenreMovie": {
                    "MovieId": 17,
                    "GenreId": 5
                }
            },
            {
                "id": 9,
                "name": "Viễn Tưởng",
                "slug": "vien-tuong",
                "GenreMovie": {
                    "MovieId": 17,
                    "GenreId": 9
                }
            },
            {
                "id": 15,
                "name": "Khoa Học",
                "slug": "khoa-hoc",
                "GenreMovie": {
                    "MovieId": 17,
                    "GenreId": 15
                }
            },
            {
                "id": 18,
                "name": "Gia Đình",
                "slug": "gia-dinh",
                "GenreMovie": {
                    "MovieId": 17,
                    "GenreId": 18
                }
            }
        ],
        "Country": {
            "id": 6,
            "name": "Mỹ",
            "slug": "my"
        },
        "Type": {
            "id": 2,
            "name": "Phim Lẻ",
            "slug": "phim-le"
        },
        "Status": {
            "id": 2,
            "name": "Hoàn Thành",
            "slug": "hoan-thanh"
        },
        "Year": {
            "id": 8,
            "name": "2018",
            "slug": "2018"
        }
    }
]

const Home = ({ navigation }) => {

    return (
        <View style={styles.container}>
            <Header allowBack={false}></Header>
            <ScrollView>
                <Slide data={data} />
                <Button
                    title="Go to watch"
                    onPress={() => navigation.push("WatchScreen",
                        {
                            source: 'https://kd.hd-bophim.com/20220818/20264_c99d4d76/index.m3u8',
                        })
                    }
                />
            </ScrollView>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});
export default Home