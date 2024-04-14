//스타일 시트, 자바스크립트 데이터를 import
/*
    ./   : 같은폴더   
    ../  : 상위폴더    
    /    : 프로젝트 경로
    /src : src펄다러 들어감
*/
import { useState } from 'react'
import data from './data'  //같은 폴더에 data파일을 data키워드로 선언
import './styles.css'      //같은 폴더에 styles.css를 쓰겠다고 선언

//외부에서 사용할수 있도록 함수 생성
export default function Accordion(){
    //선택된 title의 번호를 저장할 state (ui와 연결된 변수)
    let [selected, setSelected] = useState(null)
    //선택되면 setSelected를 통해서 id를 넣어주기
    //플래그( 단일선택/ 다중선택)
    let [enableMultiSelection, setEnableMultiSelection] = useState(false)
    //false면 단일 선택 true면 다중선택
    // !true === false        !false === true
    let [selectedList, setSelectedList] = useState([])

    function clickTitle(id){
      console.log(id);
      //selected가 null이면 눌렀을때 나오게하고
      //selected가 중복으로 눌렀으면 null로
      //selected가 null이 아니었으면 id값을 넣음
      (selected === id) ? setSelected(null) : setSelected(id)
    }
    
    function multiSelectTitle(id){
      //배열의 값을 갱신하기 위해서는 ...으로 분해했다가 다시 []로 감싼다.
      //객체의 값을 갱신하기 위해선느 ...으로 분해했다가 다시 []로 감싼다.
      setSelected(null)
      let copyList = [...selectedList];
      console.log(selectedList.indexOf(id));
      //indexOf() : 배열안에 id를 찾을수 없다면 -1, 찾으면 그위치를 반환
      //id의 위치 반환
      let findIndexOfId = selectedList.indexOf(id)
      if (findIndexOfId === -1){
        copyList.push(id);
      } else {
        copyList.splice(findIndexOfId,1);
      }
      setSelectedList(copyList);

      console.log(selectedList);
    }

    //다중 선택일때는 선택된 애들을 '모두 보관' => 배열
    return(
      <div className='wrapper'>
          <button onClick={()=>{
              setEnableMultiSelection(!enableMultiSelection);    
              console.log(enableMultiSelection);
          }}>다중선택 ON/OFF</button>
          <div className='accordion'>
              {
                data.map((element, idx)=>{
                  return (
                        <div className='item' key={idx}>
                          <div className='title' onClick={()=>{
                              enableMultiSelection == true ? multiSelectTitle(element.id) : clickTitle(element.id)
                            }}>
                              <h3>{element.title}</h3>
                              <span className='plus'>+</span>
                          </div>
                          {
                            /* 
                              && : 그리고
                              true && true   = true
                              true && false  = false
                              false && true  = false
                              false && flase = false
                              
                            */
                            enableMultiSelection === true ?
                            selectedList.indexOf(element.id) !== -1 && 
                            <div className='content'>{element.content}</div>
                            : selected === element.id && 
                            <div className='content'>{element.content}</div> 
                          }
                          {
                            //selected값이 id와 같은 부분만 content 생성
                            // (selected === element.id && !enableMultiSelection) ? 
                            // <div className='content'>{element.content}</div>  : 
                            // null
                          }
                        </div>
                  )
                })
              }
          </div>
      </div>
    )
}