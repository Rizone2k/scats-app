import { useState, useCallback, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ToastAndroid,
    Image
} from 'react-native';
import { TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

const NUM_OF_LINES = 3;

const Comment = () => {

    const [comments, setComments] = useState([
        {
            "id": 1,
            "content": "hay vãi",
            "user_id": 3,
            "movie_id": 1,
            "created_at": "2022-11-28T15:45:15.000Z",
            "open_reply": false,
            "User": {
                "id": 3,
                "username": "khavl7419531",
                "avatar": "https://drive.google.com/uc?id=1OtZ0WShJpu_DGgn9r346PsG5jksI4vng"
            },
            "Replies": [
                {
                    "id": 1,
                    "content": "9 xác",
                    "comment_id": 1,
                    "user_id": 2,
                    "created_at": "2022-11-29T06:01:14.000Z",
                    "User": {
                        "id": 2,
                        "username": "ringfake123",
                        "avatar": "https://drive.google.com/uc?id=1medVHZnNZJj8A_XHEqsPx8cl6dT1MRnu"
                    }
                },
                {
                    "id": 2,
                    "content": "9 xác",
                    "comment_id": 1,
                    "user_id": 2,
                    "created_at": "2022-11-29T06:01:14.000Z",
                    "User": {
                        "id": 2,
                        "username": "ringfake123",
                        "avatar": "https://drive.google.com/uc?id=1medVHZnNZJj8A_XHEqsPx8cl6dT1MRnu"
                    }
                },
                {
                    "id": 3,
                    "content": "9 xác",
                    "comment_id": 1,
                    "user_id": 2,
                    "created_at": "2022-11-29T06:01:14.000Z",
                    "User": {
                        "id": 2,
                        "username": "ringfake123",
                        "avatar": "https://drive.google.com/uc?id=1medVHZnNZJj8A_XHEqsPx8cl6dT1MRnu"
                    }
                },
                {
                    "id": 4,
                    "content": "9 xác",
                    "comment_id": 1,
                    "user_id": 2,
                    "created_at": "2022-11-29T06:01:14.000Z",
                    "User": {
                        "id": 2,
                        "username": "ringfake123",
                        "avatar": "https://drive.google.com/uc?id=1medVHZnNZJj8A_XHEqsPx8cl6dT1MRnu"
                    }
                }
            ]
        },
        {
            "id": 2,
            "content": "hay vcc",
            "user_id": 3,
            "movie_id": 1,
            "created_at": "2022-11-28T15:45:15.000Z",
            "open_reply": false,
            "User": {
                "id": 3,
                "username": "khavl7419531",
                "avatar": "https://drive.google.com/uc?id=1OtZ0WShJpu_DGgn9r346PsG5jksI4vng"
            },
            "Replies": [
                {
                    "id": 5,
                    "content": "9 xác",
                    "comment_id": 1,
                    "user_id": 2,
                    "created_at": "2022-11-29T06:01:14.000Z",
                    "User": {
                        "id": 2,
                        "username": "ringfake123",
                        "avatar": "https://drive.google.com/uc?id=1medVHZnNZJj8A_XHEqsPx8cl6dT1MRnu"
                    }
                },
                {
                    "id": 6,
                    "content": "9 xác",
                    "comment_id": 1,
                    "user_id": 2,
                    "created_at": "2022-11-29T06:01:14.000Z",
                    "User": {
                        "id": 2,
                        "username": "ringfake123",
                        "avatar": "https://drive.google.com/uc?id=1medVHZnNZJj8A_XHEqsPx8cl6dT1MRnu"
                    }
                },
                {
                    "id": 7,
                    "content": "9 xác",
                    "comment_id": 1,
                    "user_id": 2,
                    "created_at": "2022-11-29T06:01:14.000Z",
                    "User": {
                        "id": 2,
                        "username": "ringfake123",
                        "avatar": "https://drive.google.com/uc?id=1medVHZnNZJj8A_XHEqsPx8cl6dT1MRnu"
                    }
                },
                {
                    "id": 8,
                    "content": "9 xác",
                    "comment_id": 1,
                    "user_id": 2,
                    "created_at": "2022-11-29T06:01:14.000Z",
                    "User": {
                        "id": 2,
                        "username": "ringfake123",
                        "avatar": "https://drive.google.com/uc?id=1medVHZnNZJj8A_XHEqsPx8cl6dT1MRnu"
                    }
                }
            ]
        }
    ]);
    const [openReplyInput, setOpenReplyInput] = useState(null);
    const [commentText, setCommentText] = useState('');
    const [replyText, setReplyText] = useState('');
    const [showMore, setShowMore] = useState([]);

    const onTextLayout = useCallback((e, id) => {
        if (e.nativeEvent.lines.length > NUM_OF_LINES) {
            setShowMore(showMore => [...showMore, { id, show: false }]);
        }
    }, []);

    const handleSendComment = () => {
        if (commentText.length > 0) {
            console.log(commentText);
            setCommentText('');
        } else {
            ToastAndroid.show("Vui lòng nhập bình luận", ToastAndroid.SHORT);
        }
    }

    const handleSendReply = () => {
        if (replyText.length > 0) {
            console.log(replyText);
            setReplyText('');
        } else {
            ToastAndroid.show("Vui lòng nhập bình luận", ToastAndroid.SHORT);
        }
    }

    const handleShowMore = ({ show, id }) => {
        setShowMore(showMore =>
            showMore.map(s => {
                if (s.id == id) {
                    return { ...s, show }
                }
                return s;
            })
        );
    }

    const handleOpenReply = ({ open, id }) => {
        setComments(comments =>
            comments.map(cmt => {
                if (cmt.id == id) {
                    return { ...cmt, open_reply: open }
                }
                return cmt;
            })
        )
    }

    const handleOpenReplyInput = ({ id, user }) => {
        setOpenReplyInput(id);
        setReplyText(`@${user.username} `);
    }

    return (
        <View>
            <View style={{ marginBottom: 10 }}>
                <TextInput
                    style={{ width: "100%", marginBottom: 10, fontFamily: 'Montserrat' }}
                    mode="outlined"
                    right={
                        <TextInput.Icon
                            name="send"
                            onPress={handleSendComment}
                        />
                    }
                    onChangeText={(text) => {
                        setCommentText(text.trim());
                    }}
                    placeholder="Nhập bình luận"
                    value={comments.length}
                // value={commentText}
                />
            </View>
            <View>
                {
                    comments.map(item =>
                        <View
                            style={{
                                flexDirection: "row",
                                flex: 1,
                                marginBottom: 15
                            }}
                            key={item.id}
                        >

                            <View style={{ marginRight: 10 }}>
                                <Image
                                    style={{
                                        width: 50,
                                        height: 50,
                                        resizeMode: "contain",
                                        borderRadius: 100,
                                    }}
                                    source={{
                                        uri: item.User.avatar
                                    }}
                                />
                            </View>

                            <View
                                style={{
                                    flex: 1,
                                    paddingHorizontal: 5
                                }}
                            >

                                <View style={{ flexDirection: "row", flexWrap: "wrap", }}>
                                    <Text
                                        style={{
                                            color: "#fff",
                                            fontFamily: "MontserratBold",
                                        }}
                                    >
                                        {item.User.username}
                                    </Text>

                                    <Text
                                        style={{
                                            color: "#fff",
                                            fontFamily: "Montserrat",
                                            marginLeft: "auto",
                                            fontSize: 12
                                        }}
                                    >
                                        {item.created_at}
                                    </Text>
                                </View>

                                <View>
                                    <Text
                                        style={{
                                            color: "#fff",
                                            fontFamily: "Montserrat"
                                        }}
                                        onTextLayout={e => onTextLayout(e, `${item.id}`)}
                                        numberOfLines={
                                            showMore.some(e => e.id == 1) ?
                                                (showMore[showMore.findIndex(i => i.id == `${item.id}`)].show ? undefined : NUM_OF_LINES) :
                                                99999
                                        }
                                    >
                                        {item.content}
                                    </Text>
                                    {
                                        showMore.some(e => e.id == `${item.id}`) ?
                                            (
                                                <View style={{ flexDirection: "row", marginTop: 5 }} >
                                                    {
                                                        (showMore[showMore.findIndex(i => i.id == `${item.id}`)].show) ?
                                                            (
                                                                <TouchableOpacity
                                                                    style={{ flexShrink: 1, }}
                                                                    onPress={() => handleShowMore({ show: false, id: `${item.id}` })}
                                                                >
                                                                    <Text style={{ color: "#e6e6e6", fontFamily: "Montserrat", fontSize: 12, }}>
                                                                        Rút gọn
                                                                    </Text>
                                                                </TouchableOpacity>
                                                            ) :
                                                            (
                                                                <TouchableOpacity
                                                                    style={{ flexShrink: 1, }}
                                                                    onPress={() => handleShowMore({ show: true, id: `${item.id}` })}
                                                                >
                                                                    <Text style={{ color: "#e6e6e6", fontFamily: "Montserrat", fontSize: 12, }}>
                                                                        Xem thêm
                                                                    </Text>
                                                                </TouchableOpacity>
                                                            )
                                                    }
                                                </View>
                                            ) : ('')
                                    }
                                </View>

                                <View style={{ flexDirection: "row", flexWrap: "wrap" }}>

                                    <TouchableOpacity
                                        style={{
                                            flexDirection: "row",
                                            alignItems: "center"
                                        }}
                                        onPress={() => handleOpenReply({ open: !item.open_reply, id: item.id })}
                                    >
                                        {
                                            item.open_reply ?
                                                (<Icon name="caret-up" color="#0ff" />) :
                                                (<Icon name="caret-down" color="#0ff" />)
                                        }
                                        <Text
                                            style={{ color: "#0ff", fontFamily: "MontserratBold", marginLeft: 5 }}
                                        >
                                            {item.Replies.length} trả lời
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                            marginLeft: "auto"
                                        }}
                                        onPress={() => handleOpenReplyInput({ id: item.id, user: item.User })}
                                    >
                                        <Text
                                            style={{ color: "#0ff", fontFamily: "Montserrat" }}
                                        >
                                            Trả lời
                                        </Text>
                                    </TouchableOpacity>
                                </View>

                                {
                                    item.open_reply &&
                                    <View style={{ marginTop: 5 }}>
                                        {
                                            item.Replies.map(rep =>
                                                <View
                                                    style={{
                                                        flexDirection: "row",
                                                        flex: 1
                                                    }}
                                                    key={rep.id}
                                                >

                                                    <View style={{ marginRight: 10 }}>
                                                        <Image
                                                            style={{
                                                                width: 50,
                                                                height: 50,
                                                                resizeMode: "contain",
                                                                borderRadius: 100,
                                                            }}
                                                            source={{
                                                                uri: rep.User.avatar
                                                            }}
                                                        />
                                                    </View>

                                                    <View
                                                        style={{
                                                            flex: 1,
                                                            paddingHorizontal: 5
                                                        }}
                                                    >

                                                        <View style={{ flexDirection: "row", flexWrap: "wrap", }}>
                                                            <Text
                                                                style={{
                                                                    color: "#fff",
                                                                    fontFamily: "MontserratBold",
                                                                }}
                                                            >
                                                                {rep.User.username}
                                                            </Text>

                                                            <Text
                                                                style={{
                                                                    color: "#fff",
                                                                    fontFamily: "Montserrat",
                                                                    marginLeft: "auto",
                                                                    fontSize: 12
                                                                }}
                                                            >
                                                                {rep.created_at}
                                                            </Text>
                                                        </View>

                                                        <View>
                                                            <Text
                                                                style={{
                                                                    color: "#fff",
                                                                    fontFamily: "Montserrat"
                                                                }}
                                                                onTextLayout={e => onTextLayout(e, `${rep.id}-reply`)}
                                                                numberOfLines={
                                                                    showMore.some(e => e.id == `${rep.id}-reply`) ?
                                                                        (showMore[showMore.findIndex(i => i.id == `${rep.id}-reply`)].show ? undefined : NUM_OF_LINES) :
                                                                        99999
                                                                }
                                                            >
                                                                asdasdasdasdasdasdasdasdsasdasdasdasdsajdsajdbkasbdkasbdkasdkasjdjkasdsad
                                                                asdasdasdasdasdasdasdasdsasdasdasdasdsajdsajdbkasbdkasbdkasdkasjdjkasdsad
                                                                asdasdasdasdasdasdasdasdsasdasdasdasdsajdsajdbkasbdkasbdkasdkasjdjkasdsad
                                                            </Text>
                                                            {
                                                                showMore.some(e => e.id == `${rep.id}-reply`) ?
                                                                    (
                                                                        <View style={{ flexDirection: "row", marginTop: 5 }} >
                                                                            {
                                                                                showMore[showMore.findIndex(i => i.id == `${rep.id}-reply`)].show ?
                                                                                    (
                                                                                        <TouchableOpacity
                                                                                            style={{ flexShrink: 1, }}
                                                                                            onPress={() => handleShowMore({ show: false, id: `${rep.id}-reply` })}
                                                                                        >
                                                                                            <Text style={{ color: "#e6e6e6", fontFamily: "Montserrat", fontSize: 12, }}>
                                                                                                Rút gọn
                                                                                            </Text>
                                                                                        </TouchableOpacity>
                                                                                    ) :
                                                                                    (
                                                                                        <TouchableOpacity
                                                                                            style={{ flexShrink: 1, }}
                                                                                            onPress={() => handleShowMore({ show: true, id: `${rep.id}-reply` })}
                                                                                        >
                                                                                            <Text style={{ color: "#e6e6e6", fontFamily: "Montserrat", fontSize: 12, }}>
                                                                                                Xem thêm
                                                                                            </Text>
                                                                                        </TouchableOpacity>
                                                                                    )
                                                                            }
                                                                        </View>
                                                                    ) : ('')
                                                            }
                                                        </View>

                                                        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                                                            <TouchableOpacity
                                                                style={{
                                                                    flexDirection: "row",
                                                                    alignItems: "center",
                                                                    marginLeft: "auto"
                                                                }}
                                                                onPress={() => handleOpenReplyInput({ id: item.id, user: rep.User })}
                                                            >
                                                                <Text
                                                                    style={{ color: "#0ff", fontFamily: "Montserrat" }}
                                                                >
                                                                    Trả lời
                                                                </Text>
                                                            </TouchableOpacity>
                                                        </View>
                                                    </View>
                                                </View>
                                            )
                                        }
                                    </View>
                                }

                                {
                                    (item.id == openReplyInput) &&
                                    <View style={{ marginTop: 5 }}>
                                        <TextInput
                                            style={{ width: "100%", marginBottom: 10, fontFamily: 'Montserrat' }}
                                            mode="outlined"
                                            right={
                                                <TextInput.Icon
                                                    name="send"
                                                    onPress={handleSendReply}
                                                />
                                            }
                                            onChangeText={(text) => {
                                                setReplyText(text.trim());
                                            }}
                                            placeholder="Nhập bình luận"
                                            value={replyText}
                                        />
                                    </View>
                                }

                            </View>
                        </View>
                    )
                }
            </View>
        </View>
    )
}

export default Comment;

const styles = StyleSheet.create({});