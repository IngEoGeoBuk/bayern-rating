import { useState, useEffect } from 'react'
import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { Paper, Card, Grid, Typography, OutlinedInput, Button } from '@material-ui/core';
import Select, { ValueType } from "react-select";
import fetch from 'isomorphic-unfetch'
import styles from '../styles/Detail.module.css'
import { GetServerSideProps } from 'next'
import { RatingType, IdBoardType, OptionType } from '../types';

export const getServerSideProps: GetServerSideProps = async (context) => {
    const id = context?.params?.id;
    const res = await fetch(`${process.env.SERVER_URL}/api/players/${id}`, {
        method: 'GET',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
    });
    const data = await res.json();

    const res2 = await fetch(`${process.env.SERVER_URL}/api/ratings/${id}`, {
        method: 'GET',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
    });
    const data2 = await res2.json();
    return {
        props: { 
            players: data.data,
            ratings: data2.data
        }
    }
}

const Details = ({ players, ratings }: IdBoardType) => {
    const poId = players._id

    // 로그인 체크 //
    const [yourEmail, setYourEmail] = useState<string>('');
    const [isLogin, setIsLogin] = useState<boolean>(false);

    const checkLogin = async () => {
        const res = await fetch(`${process.env.SERVER_URL}/api/login/isLogin`, {
            method: 'GET',
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json"
            },
        });
        const data = await res.json();
        if(data.email) {
            setYourEmail(data.email);
            const tmp_email = data.email;
            setIsLogin(true);

            const res = await fetch(`${process.env.SERVER_URL}/api/ratings/${poId}/${tmp_email}`, {
                method: 'POST',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ 
                    poId, 
                    email: tmp_email, 
                })
            })
            const data2 = await res.json();
            if(data2.data.length === 1) {
                setIsYourRatings(true);
                setYourRatingInfo(data2.data)
                setContents(data2.data[0].contents)
                setSelectedRating(options[5-data2.data[0].rating]);                
            } else {
                setIsYourRatings(false);
            }
        } else {
            setIsLogin(false);
        }
    }

    // 너가 평가 남겼는지 안 남겼는지 확인하는 부분
    const [isYourRatings, setIsYourRatings] = useState<boolean>(false);
    const [yourRatingInfo, setYourRatingInfo] = useState<RatingType[]>([]);

    // 별점과 댓글내용 // 
    const options: OptionType[] = [
        { value: 5, label: '★★★★★'}, 
        { value: 4, label: '★★★★☆'}, 
        { value: 3, label: '★★★☆☆'}, 
        { value: 2, label: '★★☆☆☆'}, 
        { value: 1, label: '★☆☆☆☆'}
    ]

    const labels = ['★☆☆☆☆', '★★☆☆☆', '★★★☆☆', '★★★★☆', '★★★★★']
    const [selectedRating, setSelectedRating] = useState<ValueType<OptionType, false>>(options[0]);
    const [contents, setContents] = useState<string>("");
    const [ratingList, setRatingList] = useState<RatingType[]>(ratings);

    const onchangeSelect = (item: ValueType<OptionType, false>) => {
        setSelectedRating(item);
    };


    const addRating = async () => {
        if(!isLogin) {
            alert('로그인을 하셔야 이용 가능합니다.');
        } else {
            try {
                const res = await fetch(`${process.env.SERVER_URL}/api/ratings/${poId}`, {
                    method: 'POST',
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ 
                        poId, 
                        email: yourEmail, 
                        contents, 
                        rating: selectedRating!.value 
                    })
                })
                const data = await res.json();
                setRatingList([
                    ...ratingList,
                    {
                        _id: data.data._id, 
                        poId, 
                        email: yourEmail, 
                        contents, 
                        rating: selectedRating!.value,
                    },
                ]);
                setYourRatingInfo([
                    ...yourRatingInfo,
                    {
                        _id: data.data._id, 
                        poId,
                        email : yourEmail, 
                        contents, 
                        rating: selectedRating!.value
                    }
                ])
                setIsYourRatings(true);
                setSelectedRating(options[5-selectedRating!.value]);
            } catch (error) {
                console.log(error);
            }            
        }
    }

    // 댓글 삭제
    const deleteRating = async (raId: string) => {
        try {
            const deleted = await fetch(`${process.env.SERVER_URL}/api/ratings/${raId}`, {
                method: "Delete"
            });
            setRatingList(ratingList.filter((val : RatingType) => {
                return val._id !== raId;
            }))
            setYourRatingInfo([])
            setIsYourRatings(false)
            setSelectedRating(options[0])
        } catch (error) {
            console.log(error)
        }
    } 

    // 평가 수정 부분
    const [changeEditMode, setChangeEditMode] = useState<boolean>(false);
    const showEditWindow = () => {
        setChangeEditMode(!changeEditMode)
    }

    const updateRating = async (raId: string) => {
        const res = await fetch(`${process.env.SERVER_URL}/api/ratings/${raId}`, {
            method: 'PUT',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ contents, rating: selectedRating!.value })
        });
        const data = await res.json();
        setRatingList(ratingList.map((val : RatingType) => {
            return val._id === raId 
            ? {
                _id: data.data._id, 
                poId: data.data.poId, 
                email : data.data.email, 
                contents: data.data.contents, 
                rating: data.data.rating
            } 
            : val
        }))
        setYourRatingInfo([
            {
                _id: data.data._id, 
                poId: data.data.poId, 
                email : data.data.email, 
                contents: data.data.contents, 
                rating: data.data.rating
            }
        ])
        setIsYourRatings(true)
        showEditWindow()
    }

    useEffect(() => {
        checkLogin();
    }, [])

    return (
        <div>
            <Paper className={styles.container}>
                <Head>
                    <title>축신병신 | Details </title>
                    <meta name="keywords" content="godandfuck" />
                </Head>
                <br/>
                <Typography className={styles.title} variant="h3">
                    No.{players.no} {players.name}
                </Typography>
                <Image src={players.img} width={250} height={640} />
                <br/><br/>
            </Paper>
            <br />
            {!isYourRatings ? 
            <>  
                <div style={{ margin: '20px' }}>
                    <div className={styles.box2}>
                        <Typography style={{ paddingRight: '20px' }}>
                                별점
                        </Typography>
                        <Select
                            value={selectedRating}
                            onChange={option => onchangeSelect(option)}
                            options={options}
                            getOptionValue={(option) => String(option.value)}
                            getOptionLabel={(option) => option.label}
                            className={styles.selectBox}
                            readOnly
                        />
                    </div>
                    <div className={styles.box2}>
                        <Typography style={{ paddingRight: '20px' }}>
                                평가
                        </Typography>
                        <OutlinedInput
                            type="text"
                            onChange={(e) => {
                            setContents(e.target.value);
                            }}
                            className={styles.input}
                        />
                    </div>
                    <Button 
                        variant="outlined" 
                        onClick={() => { addRating() }}
                    >
                        평가 남기기{}
                    </Button> 
                </div>
            </> :
            <div>
                {!changeEditMode ? 
                <Card className={styles.yourRatingInto}>
                    {yourRatingInfo.map((res : RatingType) => {
                        return (
                            <div key={res._id}>
                                <Typography variant="h5">당신이 남겼던 평가</Typography>
                                <div style={{ color: '#dc052d' }}>
                                    {labels[yourRatingInfo[0].rating - 1]}
                                </div>
                                <Typography>{yourRatingInfo[0].contents}</Typography>
                                <br/>
                                <Button 
                                    variant="outlined" 
                                    onClick={showEditWindow}
                                >
                                    평가 수정
                                </Button> 
                                <Button 
                                    variant="outlined" 
                                    style={{ marginLeft: '20px' }}  
                                    onClick={() => { deleteRating(yourRatingInfo[0]._id) }}
                                >
                                    평가삭제
                                </Button>
                            </div>
                        )
                    })}
                </Card> : 
                <>
                    <div style={{ margin: '20px' }}>
                        <div className={styles.box2}>
                            <Typography style={{ paddingRight: '20px' }}>
                                    별점
                            </Typography>
                            <Select
                                value={selectedRating}
                                onChange={onchangeSelect}
                                options={options}
                                getOptionValue={(option) => String(option.value)}
                                getOptionLabel={(option) => option.label}
                                className={styles.selectBox}
                                readOnly
                            />
                        </div>
                        <div className={styles.box2}>
                            <Typography style={{ paddingRight: '20px' }}>
                                    평가
                            </Typography>
                            <OutlinedInput
                                type="text"
                                onChange={(e) => {
                                    setContents(e.target.value);
                                }}
                                className={styles.input}
                                value={contents}
                            />
                        </div>
                        <Button 
                            variant="outlined" 
                            onClick={() => { updateRating(yourRatingInfo[0]._id) }}
                        >
                            평가 수정하기
                        </Button>
                        <Button 
                            variant="outlined" 
                            style={{ marginLeft: '20px' }}  
                            onClick={showEditWindow}
                        >
                            수정취소
                        </Button>
                    </div>
                </>
                }
            </div>
            }
            <div>
                {ratingList.map((rating : RatingType) => {
                    return (
                        <Card className={styles.allratings} key={rating._id}>
                            <Typography>{rating.email}</Typography>
                            <div style={{ color: '#dc052d' }}>{labels[rating.rating - 1]}</div>
                            {rating.contents}
                        </Card>
                    )
                })}
            </div>
            
        </div>
    )
}

export default Details