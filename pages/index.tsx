import { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { Paper, Card, Grid, Typography } from '@material-ui/core';
import fetch from 'isomorphic-unfetch'
import { GradeType, BoardType } from '../types';
import styles from '../styles/Home.module.css'

export const getServerSideProps = async () => {
  const res = await fetch(`${process.env.SERVER_URL}/api/players`, {
    method: 'GET',
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    }
  });
  const data = await res.json();

  const res2 = await fetch(`${process.env.SERVER_URL}/api/grades`, {
    method: 'GET',
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    }
  });
  const data2 = await res2.json();
  return {
      props: { 
        players: data.data,
        grades: data2.data
      }
  }
}

const Home = ({ players, grades } : BoardType ) => {
  const [gradeList, setGradeList] = useState<GradeType[]>(grades);

  return (
    <Paper>
      <Head>
        <title>축신병신 | Home </title>
        <meta name="keywords" content="godandfuck" />
      </Head>
      <Grid container spacing={0}>
        {players.map((player, key: number) => {
            return (
              <Link href={`/${player._id}`} key={player._id}>
                <Card className={styles.playersBox}>
                  <div className={styles.nameBox}>
                  <Typography className={styles.playerFont}>{player.name}</Typography>
                  </div>
                  <Image src={player.img} width={125} height={320} />
                  <br/>
                  <>
                    {gradeList.map((grade: GradeType) => {
                      return (
                        <div key={grade._id}>
                            {grade._id === player._id ? 
                                <Typography>평점: {grade.total / grade.count}점</Typography> 
                                : <div></div>
                            }
                        </div>
                      )
                    })}
                  </> 
                </Card>
              </Link>
            )
          })}
      </Grid>
    </Paper>
  )
}

export default Home