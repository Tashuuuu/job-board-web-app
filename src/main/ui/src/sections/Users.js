import {useContext, useEffect} from "react";
import {UsersContext, PostsContext} from "../App";
import UserShort from "../components/UserShort";
import {useNavigate} from "react-router-dom";
import SearchBar from "../components/SearchBar";
import {removeDuplicates} from "../utils";

const getUsers = (setUsers) => {
    fetch('http://localhost:8080/users')
        .then(response => response.json())
        .then(data => {
            setUsers(data.users);
        });
};

const Users = () => {
    const {users, setUsers} = useContext(UsersContext);
    const nav = useNavigate();

    useEffect(() => {
        getUsers(setUsers);
    }, []);

    const makeShortUsers = (users) => {
        return users.map((user, i) => <UserShort user={user} key={user.id + '_' + user.name.replace(' ', '_') + '_' + i}
                                                 openDetailedUser={() => nav('/users/detailed' + '?id=' + user.id)}/>)
    };

    if (!Array.isArray(users) || users.length < 1) {
        return <p className={"text-mint font-bold text-2xl text-center py-20"}>Currently there is no users to show!</p>
    }

    return (<>
            <div className="bg-gray-light z-10" id="top">
                <div className="py-10 md:py-20 text-center max-w-screen-sm m-auto px-6 lg:px-0">
                    <h1 className="text-2xl md:text-4xl md:leading-snug pb-4 font-semibold text-coolGray-dark">Vaš Izbor
                        za Pronalazak Posla i Radnika: Pridružite Se Našoj Obitelji!</h1>
                    <p className="font-normal text-gray-dark text-coolGray-normal">Vaša potraga za poslom ili savršenim
                        kandidatom nije samo transakcija - to je put prema profesionalnom uspjehu. Kroz našu platformu,
                        nudimo podršku i alate za olakšavanje tog puta. Bez obzira trebate li novu karijeru ili dodatnu
                        radnu snagu, mi smo tu da vam pomognemo. Pridružite se danas i iskoristite prednosti naše
                        zajednice!</p>
                </div>
            </div>
            {/*<SearchBar uri={'users'} cmbTypeOn={false}/>*/}
            <div className="py-20">
                {makeShortUsers(users)}
            </div>
        </>
    )
};

export default Users;