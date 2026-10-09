function StatCard({title,value,icon}) {
    return(
        <div className="card">
            <h3>{title}</h3>

            <p>{icon} {value}</p>
        </div>
    )
}

export default StatCard