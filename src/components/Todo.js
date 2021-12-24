import {DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import {AiFillDelete, AiFillEdit, AiFillSave } from 'react-icons/ai'

function Todo (props) {
    return (
    <DragDropContext onDragEnd = {(result)=>props.handleDragEnd(result) }>
    <Droppable droppableId='todo_list'>
        { (provided) =>   (
            <ul 
                className='todo_list' 
                {...provided.droppableProps} 
                ref={provided.innerRef}
            >
            {props.todos.map(
                function(todo, index) {
                    return (
                    <Draggable key={todo.id} index={index} draggableId={String(todo.id)}>
                        {(provided) => (
                        <li
                            // key={index}
                            className= {todo.checked?`todo todo${todo.className} check`:`todo todo${todo.className}`}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}         
                        >
                            {
                                todo.edit === false ?
                            <>
                                <span>{todo.text}</span>
                                <div>
                                    <span
                                        className='edit-icon'
                                        onClick={()=>props.editTodo(todo)}
                                    >
                                        <AiFillEdit></AiFillEdit>
                                    </span>
                                    <span
                                        className='delete-icon'
                                        onClick={()=>props.removeTodo(todo)}
                                    ><AiFillDelete ></AiFillDelete></span>
                                    <input 
                                        type='checkbox'
                                        checked = {todo.checked}
                                        onChange={()=>props.handleCheckChange(todo)}    
                                    ></input>
                                </div>
                            </>
                                    :
                            <>
                                <input value={props.edit} onChange = {(e) =>props.handleOnChangeEdit(e)}/> 
                                <span
                                    className='save-icon'
                                    onClick={()=>props.saveTodo()}
                                >
                                    <AiFillSave></AiFillSave>
                                </span>
                            </>
                            }
                    </li>
                    )}
                    </Draggable>
                    )
                }
            )}
            {provided.placeholder}            
            </ul>
        )}
    </Droppable>
    </DragDropContext>
    )
}

export default Todo