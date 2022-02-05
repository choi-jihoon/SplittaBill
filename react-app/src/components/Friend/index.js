
const Friend = ({username, balance}) => {
	return (
		<div>
			{parseFloat(balance) > 0 ?
				<p>{username} owes you ${balance}</p>
				: (parseFloat(balance) < 0 ?
				<p>you owe {username} ${balance}</p>
				:  <p>All Even with {username}!</p>)
			}
		</div>
	);
};

export default Friend;
