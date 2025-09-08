import Number from "./Number"

const Persons = ({ personsToShow }) => {

    console.log(personsToShow)

    return (
        <div>
            {personsToShow.map((person) => {
            return (
                <Number 
                key={person.name} 
                person={person} />
            )
            })}
        </div>
    )

}

export default Persons