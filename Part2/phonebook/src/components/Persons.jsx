import Number from "./Number"

const Persons = ({ personsToShow }) => {

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