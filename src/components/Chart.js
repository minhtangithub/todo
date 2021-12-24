
function Chart (props) {
    return (
        <div className='chart'>
            <h4>You've completed {props.chart}% </h4>
            <svg height="20" width="20" viewBox="0 0 20 20">
            <circle r="10" cx="10" cy="10" fill="white" />
            <circle r="5" cx="10" cy="10" fill="white"
                    stroke="gray"
                    strokeWidth="10"
                    strokeDasharray= {`calc(${props.chart} * 31.42 / 100) 31.42`} />
            </svg>
        </div>
    )
}

export default Chart