import './CodeList.css';
 

function CodeList({codeBlocks}) {


    return (
      <>
        <div className="code-display">
          {codeBlocks?.map((code) => (
            <a href={`/code/${code._id}`}
              key={code._id}
              className={`code-links ${code.selected ? 'selected' : ''}`}
            >
              {code.title}
            </a>
          ))}
        </div>
      </>
    );
  }

export default CodeList;
