import Head from "next/head";
import { useState } from "react";
// 새로 만든 TodoItem 컴포넌트를 import 합니다.
import TodoItem from "@/components/TodoItem";

// Todo 타입을 export하여 다른 파일에서도 사용할 수 있게 합니다.
export type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputText, setInputText] = useState("");

  // 할 일의 완료 상태를 변경하는 함수입니다.
  const handleToggle = (id: number) => {
    // 'setTodos'를 사용하여 'todos' 배열을 업데이트합니다.
    setTodos(
      // 'map'을 사용하여 배열의 각 항목을 순회합니다.
      todos.map((todo) =>
        // 현재 할 일의 id와 인자로 받은 id가 일치하는지 확인합니다.
        todo.id === id
          ? // 일치한다면, 'completed' 상태를 반전시킨 새로운 객체를 반환합니다.
            { ...todo, completed: !todo.completed }
          : // 일치하지 않으면, 기존 할 일 객체를 그대로 반환합니다.
            todo
      )
    );
  };

  // 할 일을 삭제하는 함수입니다.
  const handleDelete = (id: number) => {
    // 'setTodos'를 사용하여 'todos' 배열을 업데이트합니다.
    // 'filter'를 사용하여 인자로 받은 id와 일치하지 않는 할 일들만 포함된 새로운 배열을 반환합니다.
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <>
      <Head>
        <title>Todo List</title>
        <meta name="description" content="A simple todo list app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* 'main' 태그에 'container' 클래스를 적용하여 중앙 정렬 및 스타일을 적용합니다. */}
      <main className="container">
        <h1>Todo List</h1>
        
        {/* 'div'에 'add-form' 클래스를 적용하여 입력 필드와 버튼의 레이아웃을 설정합니다. */}
        <div className="add-form">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Add a new todo"
          />
          <button onClick={handleAdd}>Add</button>
        </div>
        
        <ul>
          {/* 
            'todos' 배열을 순회하면서 각 할 일에 대해 'TodoItem' 컴포넌트를 렌더링합니다.
            - 'key'는 React가 각 항목을 식별하기 위해 필요합니다.
            - 'todo'는 현재 할 일 객체입니다.
            - 'onToggle'과 'onDelete'는 상태 변경 함수를 자식 컴포넌트에 전달하는 props입니다.
          */}
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={handleToggle}
              onDelete={handleDelete}
            />
          ))}
        </ul>
      </main>
    </>
  );

  function handleAdd() {
    if (inputText.trim() === "") return;

    const newTodo: Todo = {
      id: Date.now(),
      text: inputText,
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setInputText("");
  }
}
