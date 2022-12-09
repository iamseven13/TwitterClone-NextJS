import { useSession } from 'next-auth/react';
import { useState, useEffect, useRef } from 'react';

import Image from 'next/image';
import styles from './ProfileUser.module.css';
import styles2 from '../Tweets.module.css';

export default function ProfileUser(props) {
	// const [allData, setData] = useState();
	const {
		fetchData,
		isOwner,
		loggedInUsername,
		isFollowing,
		setUpdateFollowing,
		updateFollowing,
	} = props;

	const [avatarPic, setAvatarPic] = useState();

	const { username } = fetchData.user;

	const { data: session, status, loading } = useSession();
	useEffect(() => {
		if (session) {
			setAvatarPic(session.token.avatar);
		}
	}, []);

	console.log(username);
	async function handleFollow(e) {
		const data = {
			loggedInUsername: loggedInUsername,
			followingUsername: username,
		};

		e.preventDefault();
		const res = await fetch('/api/follow/follow', {
			method: 'POST',
			body: JSON.stringify(data),
		});
		const dataRes = await res.json();
		setUpdateFollowing(true);
		console.log(dataRes);
	}

	async function handleUnfollow(e) {
		const data = {
			loggedInUsername: loggedInUsername,
			followingUsername: username,
		};

		e.preventDefault();
		const res = await fetch('/api/follow/unfollow', {
			method: 'POST',
			body: JSON.stringify(data),
		});

		const dataRes = await res.json();

		setUpdateFollowing(false);
		console.log(dataRes);
	}

	if (!fetchData) {
		return (
			<div className={styles['profile-container']}>
				<p>Loading</p>
			</div>
		);
	}

	return (
		<div className={styles['profile-container']}>
			<div className={styles['profile-header']}>
				<a href="">
					<img src="./images/left-arrow.svg" alt="" />
				</a>
				<div className={styles['profile-user']}>
					<h3>
						{fetchData.user.name} {fetchData.user.surname}
					</h3>
					<span>604 Tweets</span>
				</div>
			</div>
			<div className={styles['cover-header']}>
				<Image
					src="/images/cover.jpg"
					className={styles['cover-image']}
					width={'470'}
					height={200}
				/>
				<div className={styles['profile-picture']}>
					<div className={styles.picture}>
						<Image
							src={`https://${fetchData.user.avatar}`}
							className={styles['profile-image']}
							width={'170'}
							height={100}
						/>
					</div>
					{isOwner ? <button className={styles.btn}>Edit Profile</button> : ''}
					{!isOwner && !isFollowing && !updateFollowing ? (
						<button onClick={handleFollow} className={styles.btn}>
							Follow
						</button>
					) : (
						''
					)}

					{isFollowing || updateFollowing ? (
						<button
							onClick={handleUnfollow}
							className={styles.btn + ' ' + styles.btnUnfollow}
						>
							Unfollow
						</button>
					) : (
						''
					)}
				</div>
			</div>

			<div className={styles['profile-desc']}>
				<div className={styles['profile-names']}>
					<h3>
						{fetchData.user.name} {fetchData.user.surname}
					</h3>
					<span>@{fetchData.user.username}</span>
				</div>
				<div className={styles.location}>
					<div className={styles['location-country']}>
						<img src="./images/home.svg" alt="" />
						<span>Finland</span>
					</div>
					<div className={styles['location-country']}>
						<img src="./images/list.svg" alt="" />
						<span>Joined July 2010</span>
					</div>
				</div>
			</div>

			<div className={styles['followers-following']}>
				<a href="" className={styles['following']}>
					<span className={styles['following-count']}>298</span>
					<span className={styles['following-text']}>Following</span>
				</a>
				<a href="" className={styles['followers']}>
					<span className={styles['followers-count']}>298</span>
					<span className={styles['followers-text']}>Followers</span>
				</a>
			</div>

			<div className={styles['profile-tabs']}>
				<div className={styles['tabs']}>
					<a href="/tweets">
						<span>Tweets</span>
					</a>
				</div>
				<div className={styles['tabs']}>
					<a href="">
						<span className={styles['tabs-nonActive']}>Tweets & replies</span>
					</a>
				</div>
				<div className={styles['tabs']}>
					<a href="">
						<span className={styles['tabs-nonActive']}>Media</span>
					</a>
				</div>
				<div className={styles['tabs']}>
					<a href="">
						<span className={styles['tabs-nonActive']}>Likes</span>
					</a>
				</div>
			</div>

			<div className={styles2.tweets}>
				<div className={styles2['user-tweet']}>
					<a href="">
						<Image
							src={`https://${fetchData.user.avatar}`}
							alt=""
							width={45}
							height={45}
							className={styles2['image-textarea-user']}
						/>{' '}
					</a>
					<div className={styles2['user-info']}>
						<div className={styles2['name-username']}>
							<a href="" className={styles2.fullname}>
								<span>
									{fetchData.user.name} {fetchData.user.surname}
								</span>
							</a>
							<a href="" className={styles2.username}>
								<span>@{fetchData.user.username}</span>
							</a>
						</div>
						<div className={styles2['tweet-info']}>
							<a href="">
								<p>
									Lorem ipsum dolor sit amet consectetur adipisicing elit.
									Excepturi expedita voluptatum magnam a, quod sequi ipsam in
									cumque iusto suscipit doloribus sit molestiae blanditiis
									deleniti corrupti veniam illum nemo neque?
								</p>
							</a>
						</div>
						<div className={styles2.icons}>
							<a href="">
								<img src="./images/chat.svg" alt="" />
							</a>
							<a href="">
								<img src="./images/retweet.svg" alt="" />
							</a>
							<a href="">
								<img src="./images/heart.svg" alt="" />
							</a>
							<a href="">
								<img src="./images/download.svg" alt="" />
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
