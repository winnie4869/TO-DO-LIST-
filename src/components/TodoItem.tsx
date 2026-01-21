// Todo 타입을 부모 컴포넌트와 공유하기 위해 import 합니다.
// '@/'는 'src/' 경로를 가리키는 별칭(alias)입니다.
import type { Todo } from "@/pages/index";

// TodoItem 컴포넌트에 전달될 props의 타입을 정의합니다.
type TodoItemProps = {
  todo: Todo; // 표시할 할 일 객체
  onToggle: (id: number) => void; // 완료 상태를 변경하는 함수
  onDelete: (id: number) => void; // 할 일을 삭제하는 함수
};

// TodoItem 컴포넌트를 정의합니다.
// { todo, onToggle, onDelete }는 props 객체에서 각 속성을 추출하는 구조 분해 할당입니다.
export default function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    // 'li' 요소에 'todo-item' 클래스를 적용하여 스타일을 지정합니다.
    <li className="todo-item">
      {/* 
        체크박스를 클릭하면 onToggle 함수가 호출됩니다. 
        todo.id를 인자로 전달하여 어떤 할 일의 상태를 변경할지 알려줍니다.
        'checked' 속성은 현재 할 일의 완료 상태(todo.completed)를 반영합니다.
      */}
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      {/* 
        'span' 태그는 할 일의 텍스트를 표시합니다.
        'completed' 클래스는 할 일이 완료되었을 때 조건부로 적용되어 취소선과 다른 색상을 부여합니다.
      */}
      <span className={todo.completed ? "completed" : ""}>
        {todo.text}
      </span>
      {/* 
        삭제 버튼에 'delete-button' 클래스를 적용하여 스타일을 지정합니다.
        클릭하면 onDelete 함수가 호출됩니다.
      */}
      <button onClick={() => onDelete(todo.id)} className="delete-button">Delete</button>
    </li>
  );
}
