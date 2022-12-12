import { useSession } from 'next-auth/react';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';

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

		userNotFound,
	} = props;

	const [avatarPic, setAvatarPic] = useState();
	// const [profileUser, setProfileUser] = useState({
	// 	fetchData,
	// });

	const [profilePosts, setProfilePosts] = useState();
	const [defaultAvatar, setDefaultAvatar] = useState(
		'https://www.gravatar.com/avatar/00000000000000000000000000000000'
	);
	const { data: session, status, loading } = useSession();

	let username;

	const router = useRouter();
	username = router.query.profile;

	useEffect(() => {
		if (session) {
			setAvatarPic(session.token.avatar);
		}
	}, []);

	useEffect(() => {
		async function fetchUserPosts() {
			const res = await fetch('/api/profile/ProfilePosts', {
				method: 'POST',
				body: JSON.stringify({ username }),
			});

			const data = await res.json();
			setProfilePosts(data);
		}

		fetchUserPosts();
	}, [username]);

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

	if (!fetchData && !userNotFound) {
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
						{!userNotFound
							? fetchData?.user?.name + ' ' + fetchData?.user?.surname
							: 'User doesnt exist'}
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
							src={
								fetchData ? `https://${fetchData?.user?.avatar}` : defaultAvatar
							}
							className={styles['profile-image']}
							width={'170'}
							height={100}
						/>
					</div>
					{isOwner ? <button className={styles.btn}>Edit Profile</button> : ''}
					{!isOwner && !isFollowing && !updateFollowing && !userNotFound ? (
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
						{!userNotFound
							? fetchData?.user?.name + ' ' + fetchData?.user?.surname
							: 'User doesnt exist'}
					</h3>
					<span>@{fetchData?.user?.username}</span>
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
			{userNotFound ? (
				<div className={styles2.tweets}>
					<h1 className={styles['profile-names']}>User doesnt exist</h1>
				</div>
			) : (
				''
			)}
			<div className={styles2.tweets}>
				{!profilePosts
					? 'This user has no posts'
					: profilePosts.map((post) => (
							<div className={styles2['user-tweet']}>
								<a href="">
									<Image
										src={
											fetchData
												? `https://${fetchData?.user?.avatar}`
												: defaultAvatar
										}
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
												{fetchData?.user?.name} {fetchData?.user?.surname}
											</span>
										</a>
										<a href="" className={styles2.username}>
											<span>@{fetchData?.user?.username}</span>
										</a>
									</div>
									<div className={styles2['tweet-info']}>
										<a href={`/post/${post._id}`}>
											<p>{post.tweet}</p>
										</a>
									</div>
									<div className={styles2.icons}>
										<a href="" className={styles.chat}>
											<img src="./images/chat.svg" alt="" />
										</a>
										<a href="" className={styles.retweet}>
											<img src="./images/retweet.svg" alt="" />
										</a>
										<a href="" className={styles.heart}>
											<img src="./images/heart.svg" alt="" />
										</a>
										<a href="" className={styles.download}>
											<img src="./images/download.svg" alt="" />
										</a>
									</div>
								</div>
							</div>
					  ))}
			</div>
			;
		</div>
	);
}
