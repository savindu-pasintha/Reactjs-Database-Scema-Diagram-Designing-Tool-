import React, { useEffect, useState } from 'react'
import Draggable, { DraggableCore } from 'react-draggable'; // Both at the same time
import './D.css';

export default function D() {
  const [tbl, setTbl] = useState('');
  const [tblName, setTblName] = useState('');
  const [tblNameList, setTblNameList] = useState([]);
  const [listOfTableComponents, setTableList] = useState(["savindu", "pasintha"]);
  const [colData, setColData] = useState({
    colum: '', type: '', N: '', indenty: '', auto: ''
  });
  const [addColumArr, setAddColumArr] = useState([{
    colum: 'A', type: 'varchar', N: 'Non', indenty: 'primarykey', auto: 'none'
  },]);
  const [change, setChange] = useState('1');
  //const [wholeTblData, setWholeTblData] = useState([{ 'tableName': [{ colum: '', type: '', N: '', indenty: '', auto: '', col_Id: '' }] }]);
  const [wholeTblData, setWholeTblData] = useState([]);

  //Right side Diagram onclick ->load the table to screen
  const tblDiagramSampleColume = (columdata) => (<>
    <div
      style={{
        width: '180px', display: 'flex',
        margin: '0px', backgroundColor: 'green',
        paddingTop: '5px'
      }}>
      <button
        style={{
          width: '150px', display: 'flex',
          height: '30px',
          margin: '0px',
        }}
        onClick={() => { alert(columdata?.colum); }}
      >
        <p>{columdata?.colum}
          {" "}
          {columdata?.type}
          {" "}
          {columdata?.indenty}
          {" "}
          {columdata?.auto}
          {" "}
          {columdata?.N}</p>
      </button>
    </div>
  </>);
  const tblDiagram = (itemTblName) =>
    <div id={tblName ? tblName : 'id'}
      style={{
        width: '180px', height: 'auto',
        border: '1px solid black',
        margin: '20px',
      }}>
      <h>Table Name : {itemTblName}</h>
      <>
        {
          //addColumArr.map((columdata) => tblDiagramSampleColume(columdata))  
        }
      </>
      <>
        {
          accessSpecificTableColums(itemTblName).map((columdata) => tblDiagramSampleColume(columdata))
        }
      </>
    </div>
    ;
  const addTable = (tableName) => {
    if (tableName != "" && tableName != null) {
      if (tblNameList.length > 0) {
        //try to enter different table ename
        if (tblNameList.indexOf(tableName) == -1) {// true = not contain table name
          var arr = tblNameList;
          arr.push(tableName);
          setTblNameList(arr);
          console.log('if Add tblNameList: ', tblNameList);

          var obj = {};
          obj[tableName] = [{ colum: `col 1`, type: '', N: '', indenty: '', auto: '', col_id: (Math.random(10000)) }];
          var ar = wholeTblData;
          ar.push(obj);
          setWholeTblData(ar);
          console.log('if whole Table data', wholeTblData);

          setChange(Math.random(200));
        } else {
          alert("Please enter Different table name !");
        }
      }
      else {
        var arr = [];
        arr.push(tableName);
        setTblNameList(arr);
        console.log('else Add tblNameList: ', tblNameList);

        //whole Data with Tables
        var obj = {};
        obj[tableName] = [{ colum: `col 1`, type: '', N: '', indenty: '', auto: '', col_id: (Math.random(10000)) }];
        var ar = [];
        ar.push(obj);
        setWholeTblData(ar);
        console.log('else whole Table data', wholeTblData);

        setChange(Math.random(200));
      }

    } else {
      alert("Please enter table name !");
    }

  }
  //Left side editable box
  const removeLeftTableWhenClick = (table) => {
    var arr = tblNameList.filter(function (ele) { return ele != table; });
    setTblNameList(arr);
    alert(`Delete Table : ${table}`);
    console.log('Remove tblNameList: ', tblNameList);
    setChange(Math.random(200));
  }
  const removeLeftColumWhenClick = (tableName, col) => {
    // console.log(`Delete Colum ${col?.colum} : `, addColumArr);
    var arr = addColumArr.filter(function (ele) {
      var { colum, type, N, indenty, auto } = ele;
      if (colum != col?.colum) {
        return col;
      }
    });
    setAddColumArr(arr);

    // wholeTbldata colum remove
    var arWholeTblData = wholeTblData;
    var clickedTableDataObject = arWholeTblData.find((ele) => {
      return ele[tableName];
    });
    //console.log("clickedTableDataObject : ", clickedTableDataObject);
    var arrColums = clickedTableDataObject[`${tableName}`];//{tbn:[]}
    var arrNew = arrColums.filter((ele) => ele.colum != col.colum);
    var TO = {};
    TO[`${tableName}`] = arrNew;
    var currentTableNameDataIndex = arWholeTblData.findIndex((ele) => {
      return ele[tableName];
    });
    arWholeTblData[currentTableNameDataIndex] = TO;
    setWholeTblData(arWholeTblData);
    //console.log(arWholeTblData);
    alert(`Delete Colum : ${col?.colum}`);

    setChange(Math.random(200));
  }
  const changeColumValues = (tableName, colum_name, value, inputType) => {
    if (true) {
      var arr = addColumArr;
      arr = addColumArr.filter((ele) => {
        if (colum_name == ele.colum) {
          ele.colum = value;
          return ele;
        }
      });
      // setAddColumArr(arr);
      //console.log(`Change Colum ${colum_name + ":" + value}`, "addColumArr: ", addColumArr, "arr: ", arr);

      // wholeTbldata colum remove
      var arWholeTblData = wholeTblData;
      var clickedTableDataObject = arWholeTblData.find((ele) => {
        return ele[tableName];
      });
      //console.log("clickedTableDataObject : ", clickedTableDataObject);
      var arrColums = clickedTableDataObject[`${tableName}`];//{tbn:[]}
      var columObjectIndex = arrColums.findIndex((ele) => {
        if (ele.colum == colum_name) {
          ele[colum_name] = value;
          return ele;
        }
      });
      // console.log(arrColums[columObjectIndex]);
      if (inputType == 'type') { arrColums[columObjectIndex].type = value; }
      if (inputType == 'N') { arrColums[columObjectIndex].N = value; }
      if (inputType == 'auto') { arrColums[columObjectIndex].auto = value; }
      if (inputType == 'colum') { arrColums[columObjectIndex].colum = value; }
      if (inputType == 'identity') { arrColums[columObjectIndex].indenty = value; }

      var TO = {};
      TO[`${tableName}`] = arrColums;
      var currentTableNameDataIndex = arWholeTblData.findIndex((ele) => {
        return ele[tableName];
      });
      arWholeTblData[currentTableNameDataIndex] = TO;
      setWholeTblData(arWholeTblData);

      setChange(Math.random(200));
    } else {
      console.log("Please enter values for colum");
    }
  }
  const styles = {
    input: {
      width: '30px'
    }
  }
  const sampleColume = (tableName, colum_data) => (
    <div
      className='sampleColume'
      style={{
        paddingTop: "5px", paddingBottom: "2px",
        display: 'flex', float: 'inherit'
      }}>
      <div>
        <input
          style={styles.input}
          value={colum_data?.colum}
          onChange={(e) => { changeColumValues(tableName, colum_data?.colum, e.target.value, 'colum'); }}
          placeholder="Colum name" />
      </div>
      <div>
        <input
          style={styles.input}
          value={colum_data?.type}
          onChange={(e) => {
            changeColumValues(tableName, colum_data?.colum, e.target.value, 'type');
            // setColData({ ...colData, type: e.target.value });
          }} placeholder="Data type"
        //list="browsers" name="browser" id="browser"
        />
        <datalist id="browsers">
          <option value="Edge" />
          <option value="Firefox" />
          <option value="Chrome" />
          <option value="Opera" />
          <option value="Safari" />
        </datalist>
      </div>
      <div>
        <input
          style={styles.input}
          value={colum_data?.N}
          onChange={(e) => {
            changeColumValues(tableName, colum_data?.colum, e.target.value, 'N');
            //  setColData({ ...colData, N: e.target.value });
          }} placeholder="N/NN"
        //list="nn" name="nn" id="nn"
        />
        <datalist id="nn">
          <option value="null" />
          <option value="not null" />
        </datalist>
      </div>
      <div>
        <input
          style={styles.input}
          value={colum_data?.indenty}
          onChange={(e) => {
            changeColumValues(tableName, colum_data?.colum, e.target.value, 'identity');
            // setColData({ ...colData, indenty: e.target.value });
          }} placeholder="Identity"
        //list="pk" name="pk" id="pk"
        />
        <datalist id="pk">
          <option value="primary" />
          <option value="uniuqe" />
        </datalist>
      </div>
      <div>
        <input
          style={styles.input}
          value={colum_data?.auto}
          onChange={(e) => {
            changeColumValues(tableName, colum_data?.colum, e.target.value, 'auto');
            // setColData({ ...colData, auto: e.target.value });
          }} placeholder="Auto incerent"
        //list="auto" name="auto" id="auto"
        />
        <datalist id="auto">
          <option value="Auto increment" />
          <option value="None" />
        </datalist>
      </div>
      <div>
        <button
          style={{ backgroundColor: 'red' }}
          onClick={() => { removeLeftColumWhenClick(tableName, colum_data); }}>x</button>
      </div>
    </div>
  );
  const addNewColum = (item) => {
    var arr = addColumArr;
    arr.push({ colum: `col ${addColumArr?.length + 1}`, type: 'Int', auto: 'Non', indenty: 'Auto Increment' });
    setAddColumArr(arr);

    //whole Data with Tables
    var arWholeTblData = wholeTblData;
    var tableName = item;
    console.log('clicked table name for add col : ', tableName);

    //[{{tbn:[]},{tbn2:[]}}]
    var clickedTableDataObject = arWholeTblData.find((ele) => {
      return ele[tableName];
    });

    var arrColums = clickedTableDataObject[`${tableName}`];//{tbn:[]}
    var addNCol = { colum: `col ${arrColums?.length + 1}`, type: '', N: '', indenty: '', auto: '', col_id: (Math.random(10000)) };
    arrColums.push(addNCol);

    //console.log('arr', arrColums);
    //console.log("end------", tableName);

    var obj = {};
    obj[`${tableName}`] = arrColums;//{tbn : [{}]}
    var currentTableNameDataIndex = arWholeTblData.findIndex((ele) => {
      return ele[tableName];
    });
    //console.log('withoutCurrentTableNameDataIndex', withoutCurrentTableNameData);
    //append updated colums to specific table 
    arWholeTblData[currentTableNameDataIndex] = obj;
    setWholeTblData(arWholeTblData);
    console.log('wholeTblData', wholeTblData);

    setChange(Math.random(200));
  }
  const accessSpecificTableColums = (tableName) => {
    var arr = wholeTblData;
    var clickedTableDataObject = arr.find((ele) => {
      return ele[tableName];
    });
    var arrColums = clickedTableDataObject[`${tableName}`];//{tbn:[]}
    return arrColums;
  }
  const tableCols = (item) => (
    <div
      style={{
        padding: '10px',
      }}
    >
      <div
        style={{
          height: 'auto', padding: '10px',
          display: 'block', border: '1px solid black'

        }}
      >
        <div>
          <h>Table Name : {item}</h>{' '}
          <button
            style={{ backgroundColor: 'red' }}
            onClick={() => { removeLeftTableWhenClick(item); }}>X</button>
        </div>
        <>
          {
            /*addColumArr.map((columdata) => sampleColume(item, columdata))*/
          }
        </>
        <>
          {
            accessSpecificTableColums(item).map((columdata) => sampleColume(item, columdata))
          }
        </>
        <div>
          <button>Add Index</button>
          <button onClick={() => { addNewColum(item); }}>Add Colum</button>

        </div>
      </div>
    </div>
  );
  //tblNameList, addColumArr, 
  useEffect(() => { }, [change]);

  return (
    <div style={{ width: '100%', display: 'block' }}>
      <div style={{ minHeight: window.innerHeight, width: '100%', display: 'flex' }}>

        {/**Right Table boxed */}
        <div style={{ width: '50%', display: 'flex', backgroundColor: "white" }}>
          <div>
            {/** Table Add */}
            <div style={{ display: 'block' }}>
              <input onChange={(event) => {
                setTblName(event.target.value);
                //setChange(true ? false : true); 
              }}
                placeholder="table 1" />
              <button onClick={() => { addTable(tblName); }}>Add Table</button>
            </div>
            <br />
            <div style={{ display: 'block', }}>
              <button>Export As SQL</button> <button>Import SQL</button>
            </div>

            {/** Table List Colums */}
            <br />
            <div style={{ display: 'block', }}>
              {
                <>
                  {
                    tblNameList.map((item) => {
                      return (
                        <div key={item}>
                          <div>
                            <div> {tableCols(item)}</div>
                          </div>
                        </div>
                      )
                    })

                  }
                </>
              }
            </div>
          </div>
        </div>


        {/** Left Diagram boxes */}
        <div style={{ width: '50%', display: 'flex', backgroundColor: "white" }}>
          <div>
            {
              tblNameList.map((item, i) => {
                return (<Draggable id={item?.id} key={item?.key}><div>{tblDiagram(item)}</div></Draggable>);
              })
            }
          </div>
        </div>
      </div>
    </div >
  )
}
