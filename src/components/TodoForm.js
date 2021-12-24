function TodoForm(props) {
    return (
        <form onSubmit={(e) => props.handleSubmit(e)} className='form'>
            <input 
                className='input'
                type='text'
                ref={props.inputRef}
                placeholder= 'Add new todo'
                value={props.input}
                onChange={props.handleChange}
            />
            <button
                onSubmit={(e) => props.handleSubmit(e)}
            >Add
            </button>
        </form>
    )
}

export default TodoForm