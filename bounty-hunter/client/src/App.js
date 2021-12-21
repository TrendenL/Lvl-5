import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Bounty from './components/Bounty'
import BountyForm from './components/BountyForm'

export default function App() {

    const [bounties, setBounties] = useState([])

    function getBounty(){
        axios.get('/bounties')
            .then(res => {setBounties(res.data)})
            .catch(err => console.log(err))
    }

    function addBounty(newBounty){
        axios.post('/bounties', newBounty)
        .then(res => {setBounties(prevBounties => [...prevBounties, res.data])})
        .catch(err => console.log(err))
    }

    function deleteBounty(bountyId){
        axios.delete(`/bounties/${bountyId}`)
        .then(res => {setBounties(prevBounties => prevBounties.filter(bounty => bounty._id !== bountyId))})
        .catch(err => console.log(err))
    }

    function editBounty(updates, bountyId){
        axios.put(`/bounties/${bountyId}`, updates)
        .then(res => {setBounties(prevBounties => prevBounties.map(bounty => bounty._id !== bountyId ? bounty : res.data))})
        .catch(err => console.log(err))
    }

    function handleFilter(e){
        if(e.target.value === "reset"){
            getBounty()
        } else{
            axios.get(`/bounties/search/type?type=${e.target.value}`)
            .then(res => setBounties(res.data))
            .catch(err => console.log(err))
        }
    }

    useEffect(() => {
        getBounty()
    }, [])

    return (
        <div className='bounty-container'>
            <h1>Star Wars Bounty $$$</h1>
            <BountyForm submit={addBounty} btnText="add bounty"/>
            <h4>Filter by Side</h4>
            <select onChange={handleFilter} className='filter-form'>
                <option value="reset">select a genre</option>
                <option value="jedi">jedi</option>
                <option value="sith">sith</option>
            </select>
            {bounties.map(bounty => <Bounty {...bounty} key={bounty.firstName} deleteBounty={deleteBounty} editBounty={editBounty} />)}
        </div>
    )
}
