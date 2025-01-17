import avatar from "../assets/avatar.jpg";
import robot_img from "../assets/robot_image.png";
import { useState, useRef, useEffect } from "react";
import ScaleLoader from "react-spinners/ScaleLoader";
import { TypeAnimation } from "react-type-animation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage } from "@fortawesome/free-regular-svg-icons";
import './style.css';


function ChatBot(props) {
  const messagesEndRef = useRef(null);
  const [timeOfRequest, SetTimeOfRequest] = useState(0);
  let [promptInput, SetPromptInput] = useState("");
  let [sourceData, SetSourceData] = useState("nttu");
  let [chatHistory, SetChatHistory] = useState([]);

  const commonQuestions=[
    "Tìm các ứng viên học tại Ha Noi University of Science and Technology",
    "Ứng viên có GPA lớn hơn 3.2",
    "Ứng viên có bằng giỏi tốt nghiệp bách khoa",
    "Tìm ứng viên có sử dụng Cloud AWS",
    "Ứng viên thành thạo ít nhất 5 ngôn ngữ lập trình",
    // "Điều kiện nhận học bổng"
  ]
  let [isLoading, SetIsLoad] = useState(false);
  let [isGen, SetIsGen] = useState(false);
  const [dataChat, SetDataChat] = useState([
    [
      "start",
      [
        "Xin chào! Đây là GluTis Chatbot, trợ lý đắc lực dành cho bạn! Bạn muốn tìm kiếm thông tin về những gì? Đừng quên chọn nguồn tham khảo phù hợp để mình có thể giúp bạn tìm kiếm thông tin chính xác nhất nha. 😄",
        null,
      ],
    ],
  ]);
  useEffect(() => {
    ScrollToEndChat();
  }, [isLoading]);
  useEffect(() => {
    const interval = setInterval(() => {
      SetTimeOfRequest((timeOfRequest) => timeOfRequest + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  function ScrollToEndChat() {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  }
  const onChangeHandler = (event) => {
    SetPromptInput(event.target.value);
  };

  async function SendMessageChat() {
    if (promptInput !== "" && isLoading === false) {
        SetTimeOfRequest(0);
        SetIsGen(true);
        SetPromptInput("");
        SetIsLoad(true);
        SetDataChat((prev) => [...prev, ["end", [promptInput, sourceData]]]);
        SetChatHistory((prev) => [promptInput, ...prev]);

        try {
            // Gọi API FastAPI
            const response = await fetch("http://localhost:8000/search", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ query: promptInput }),
                credentials: "include",
            });

            if (!response.ok) {
                throw new Error("Failed to fetch from API");
            }

            // Lấy kết quả trả về từ API
            const result = await response.json();

            // Xử lý đầu ra mới của API
            if (result.response) {
                // Thêm kết quả vào giao diện
                SetDataChat((prev) => [
                    ...prev,
                    ["start", [`${result.response}Đường dẫn tệp: ${result.file_path}`, null]]
                ]);
            } else {
                // Xử lý trường hợp không có trường "response"
                SetDataChat((prev) => [
                    ...prev,
                    ["start", ["Lỗi: Không có phản hồi từ API", null]]
                ]);
            }
        } catch (error) {
            console.error("Error:", error);
            SetDataChat((prev) => [
                ...prev,
                ["start", ["Lỗi, không thể kết nối với server", null]],
            ]);
        } finally {
            SetIsLoad(false);
        }
    }
}


  // async function SendMessageChat() {
  //   if (promptInput !== "" && isLoading === false) {
  //       SetTimeOfRequest(0);
  //       SetIsGen(true);
  //       SetPromptInput("");
  //       SetIsLoad(true);
  //       SetDataChat((prev) => [...prev, ["end", [promptInput, sourceData]]]);
  //       SetChatHistory((prev) => [promptInput, ...prev]);

  //       try {
  //           // Gọi API FastAPI
  //           const response = await fetch("http://localhost:8000/search", {
  //               method: "POST",
  //               headers: {
  //                   "Content-Type": "application/json",
  //               },
  //               body: JSON.stringify({ query: promptInput }), // Gửi câu hỏi
  //               credentials: "include",
  //           });
  //           console.log(response);

  //           if (!response.ok) {
  //               throw new Error("Failed to fetch from API");
  //           }
  //           const result = await response.json();
  //           console.log(result); 
  //           // Kiểm tra xem kết quả có trường "results" hay không và nó có phải là một mảng không
  //           if (result.results && Array.isArray(result.results)) {
  //             console.log("Results are an array:", result.results);

  //             // Gộp tất cả các response vào một chuỗi duy nhất
  //             const combinedResponse = result.results.map(item => item.response).join('\n\n');

  //             // Cập nhật chat với đoạn kết quả đã gộp
  //             SetDataChat((prev) => [
  //               ...prev,
  //               ["start", [combinedResponse, null, sourceData]], // Đưa đoạn text gộp vào chat
  //             ]);
  //           } else {
  //             // Nếu không có trường "results" hoặc không phải mảng, thông báo lỗi
  //             console.error("Expected an array of results but got:", result);
  //             SetDataChat((prev) => [
  //               ...prev,
  //               ["start", ["Lỗi: Không có kết quả phù hợp", null]],
  //             ]);
  //           }
            
            // Cập nhật câu trả lời vào giao diện
            // SetDataChat((prev) => [
            //     ...prev,
            //     ["start", [result.response, null, sourceData]],
            // ]);
//         } catch (error) {
//             console.error("Error:", error);
//             SetDataChat((prev) => [
//                 ...prev,
//                 ["start", ["Lỗi, không thể kết nối với server", null]],
//             ]);
//         } finally {
//             SetIsLoad(false);
//         }
//     }
// }


  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      SendMessageChat();
    }
  };
  let [reference, SetReference] = useState({
    title: "",
    source: "",
    url: "",
    text: ``,
  });
  const handleReferenceClick = (sources, sourceType) => {
    SetReference({
      title:
        sourceType == "wiki"
          ? sources.metadata.title
          : sources.metadata.page==undefined? "Sổ tay sinh viên 2023" : "Trang " + sources.metadata.page + " (sổ tay SV)",
      source: sourceType == "wiki" ? "Wikipedia" : "Đại học Nguyễn Tất Thành",
      url:
        sourceType == "wiki"
          ? sources.metadata.source
          : "https://ctsv.ntt.edu.vn/sinh-vien-can-biet/",
      text:
        sourceType == "wiki" ? sources.metadata.summary : sources.page_content,
    });
  };
  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-100 h-[85vh] ">
      <div className="hidden lg:block  drawer-side absolute w-64 h-[20vh] left-3 mt-5 drop-shadow-md">
        {/* <div className="menu p-4 w-full min-h-full bg-gray-50 text-base-content rounded-2xl mt-3  overflow-auto scroll-y-auto max-h-[80vh]"> */}
        <div className="hidden lg:block drawer-side absolute w-80 h-[20vh] left-3 mt-2 drop-shadow-md">

          {/* Sidebar content here */}
          <ul className="menu text-sm border-box">

            <h2 className="font-bold text-2xl mb-3 bg-[linear-gradient(90deg,hsl(var(--s))_0%,hsl(var(--sf))_9%,hsl(var(--pf))_42%,hsl(var(--p))_47%,hsl(var(--a))_100%)] bg-clip-text will-change-auto [-webkit-text-fill-color:transparent] [transform:translate3d(0,0,0)] motion-reduce:!tracking-normal max-[1280px]:!tracking-normal [@supports(color:oklch(0_0_0))]:bg-[linear-gradient(90deg,hsl(var(--s))_4%,color-mix(in_oklch,hsl(var(--sf)),hsl(var(--pf)))_22%,hsl(var(--p))_45%,color-mix(in_oklch,hsl(var(--p)),hsl(var(--a)))_67%,hsl(var(--a))_100.2%)] ">
              Lịch sử trò chuyện
            </h2>
            {chatHistory.length == 0 ? (
              <p className="text-sm text-gray-500">
                Hiện chưa có cuộc hội thoại nào
              </p>
            ) : (
              ""
            )}
            {chatHistory.map((mess, i) => (
              <li key={i}>
                <p>
                  <FontAwesomeIcon icon={faMessage} />
                  {mess.length < 80 ? mess : mess.slice(0, 80) + "..."}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="hidden lg:block  drawer-side absolute w-64 h-[20vh] mt-5 right-3 drop-shadow-md">
        {/* <div className="menu p-4 w-full min-h-full bg-gray-50 text-base-content rounded-2xl mt-3"> */}
        <div className="hidden lg:block drawer-side absolute w-80 h-[27vh] mt-2 right-3 drop-shadow-md border-box">

        {/* <div className="hidden lg:block drawer-side absolute w-80 h-[20vh] mt-2 right-3 drop-shadow-md"> */}

          {/* Sidebar content here */}
          <h2 className="font-bold text-2xl mb-2 bg-[linear-gradient(90deg,hsl(var(--s))_0%,hsl(var(--sf))_9%,hsl(var(--pf))_42%,hsl(var(--p))_47%,hsl(var(--a))_100%)] bg-clip-text will-change-auto [-webkit-text-fill-color:transparent] [transform:translate3d(0,0,0)] motion-reduce:!tracking-normal max-[1280px]:!tracking-normal [@supports(color:oklch(0_0_0))]:bg-[linear-gradient(90deg,hsl(var(--s))_4%,color-mix(in_oklch,hsl(var(--sf)),hsl(var(--pf)))_22%,hsl(var(--p))_45%,color-mix(in_oklch,hsl(var(--p)),hsl(var(--a)))_67%,hsl(var(--a))_100.2%)] ">
            Nguồn tìm kiếm
          </h2>
          <ul className="menu">
            <li>
              <label className="label cursor-pointer">
                <span className="label-text font-medium">
                  Ứng viên mới trong đợt tuyển dụng hiện tại
                </span>
                <input
                  type="radio"
                  name="radio-10"
                  value={"now"}
                  checked={sourceData === "now"}
                  onChange={(e) => {
                    SetSourceData(e.target.value);
                  }}
                  className="radio checked:bg-blue-500"
                />
              </label>
            </li>
            <li>
              <label className="label cursor-pointer">
                <span className="label-text font-medium">
                  Ứng viên trong đợt tuyển dụng cũ đã lưu CV
                </span>
                <input
                  value={"old"}
                  type="radio"
                  name="radio-10"
                  checked={sourceData === "old"}
                  onChange={(e) => {
                    SetSourceData(e.target.value);
                  }}
                  className="radio checked:bg-blue-500"
                />
              </label>
            </li>
          </ul>
        </div>
        <div
            className="hidden lg:block drawer-side absolute w-80 h-[50vh] mt-[215px] right-3 drop-shadow-md border-box"
        >

          {/* <div className="hidden lg:block drawer-side absolute w-80 h-[20vh] mt-2 right-3 drop-shadow-md"></div> */}
          {/* Sidebar content here */}
          <ul className="menu text-sm">
            <h2 className="font-bold text-2xl mb-2 bg-[linear-gradient(90deg,hsl(var(--s))_0%,hsl(var(--sf))_9%,hsl(var(--pf))_42%,hsl(var(--p))_47%,hsl(var(--a))_100%)] bg-clip-text will-change-auto [-webkit-text-fill-color:transparent] [transform:translate3d(0,0,0)] motion-reduce:!tracking-normal max-[1280px]:!tracking-normal [@supports(color:oklch(0_0_0))]:bg-[linear-gradient(90deg,hsl(var(--s))_4%,color-mix(in_oklch,hsl(var(--sf)),hsl(var(--pf)))_22%,hsl(var(--p))_45%,color-mix(in_oklch,hsl(var(--p)),hsl(var(--a)))_67%,hsl(var(--a))_100.2%)] ">
              Những câu hỏi phổ biến
            </h2>

            {commonQuestions.map((mess, i) => (
              <li key={i} onClick={() => SetPromptInput(mess)}>
                <p className="max-w-64">
                  <FontAwesomeIcon icon={faMessage} />
                  {mess}
                  {/* {mess.length < 20 ? mess : mess.slice(0, 20) + "..."} */}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={"flex justify-center h-[80vh]"}>
        {/* Put this part before </body> tag */}
        <input type="checkbox" id="my_modal_6" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">{reference.title}</h3>{" "}
            <p className="font-normal text-sm">Nguồn: {reference.source}</p>
            <p className="py-4 text-sm">
              {reference.text.slice(0, 700) + "..."}
            </p>
            <p className="link link-primary truncate">
              <a href={reference.url} target="_blank">
                {reference.url}
              </a>
            </p>
            <div className="modal-action">
              <label htmlFor="my_modal_6" className="btn btn-error">
                ĐÓNG
              </label>
            </div>
          </div>
        </div>

        <div
          id="chat-area"
          className="
          mt-5 text-sm 
          scrollbar-thin scrollbar-thumb-gray-300 bg-white  
          scrollbar-thumb-rounded-full scrollbar-track-rounded-full
          rounded-3xl border-2 md:w-[52%] md:p-3 p-1  w-full overflow-auto scroll-y-auto h-[93%] "
        >
          {dataChat.map((dataMessages, i) =>
            dataMessages[0] === "start" ? (
              <div className="chat chat-start drop-shadow-md" key={i}>
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full border-2 border-blue-500">
                    <img className="scale-150" src={robot_img} />
                  </div>
                </div>
                <div className="chat-bubble chat-bubble-info colo break-words ">
                  <TypeAnimation
                    style={{ whiteSpace: 'pre-line' }} 
                    sequence={[
                      // () => ScrollToEndChat(),
                      dataMessages[1][0]
                      
                      ,
                      () => SetIsGen(false),
                      // SetIsLoad(false),
                      // .replace("\n\n", "")
                      // .split("\n")
                      // .map((item, key) => {
                      //   return (
                      //     <>
                      //       {item.replace(/ /g, "\u00A0")}
                      //       <br />
                      //     </>
                      //   );
                      // })
                    ]}
                    cursor={false}
                    // wrapper="span"
                    speed={100}
                  />
                  {dataMessages[1][1] === null ||
                  dataMessages[1][1].length == 0 ? (
                    ""
                  ) : (
                    <>
                      <div className="divider m-0"></div>
                      <p className="font-semibold text-xs">
                        Tham khảo:{" "}
                        {dataMessages[1][1].map((source, j) => (
                          <label
                            htmlFor="my_modal_6"
                            className="kbd kbd-xs mr-1 hover:bg-sky-300 cursor-pointer"
                            onClick={() =>
                              handleReferenceClick(source, dataMessages[1][2])
                            }
                            key={j}
                          >
                            {dataMessages[1][2] == "wiki"
                              ? source.metadata.title
                              : source.metadata.page==undefined? "Sổ tay sinh viên 2023" : "Trang " +
                                source.metadata.page +
                                " (sổ tay SV)"}
                          </label>
                        ))}
                      </p>
                    </>
                  )}
                </div>
              </div>
            ) : (
              <div className="chat chat-end">
                {/* bg-gradient-to-r from-cyan-500 to-blue-500 */}
                <div className="chat-bubble shadow-xl chat-bubble-primary bg-gradient-to-r from-purple-500 to-blue-500 text-white">
                  {dataMessages[1][0]}
                  <>
                    <div className="divider m-0"></div>
                    <p className="font-light text-xs text-cyan-50">
                      Tham khảo:{" "}
                      {dataMessages[1][1] == "wiki" ? "Wikipedia" : "GluTis"}
                    </p>
                  </>
                </div>
              </div>
            )
          )}
          {isLoading ? (
          <div className="chat chat-start">
            <div className="chat-image avatar">
              <div className="w-10 rounded-full border-2 border-blue-500 animate-pulse">
                <img src={robot_img} alt="robot avatar" />
              </div>
            </div>
            <div className="chat-bubble chat-bubble-info flex items-center space-x-4">
              <div className="loader-wrapper flex items-center justify-center">
                <ScaleLoader
                  color="#4a90e2"
                  loading={true}
                  height={12}
                  width={3}
                  speedMultiplier={1.2}
                />
              </div>
              <p className="text-xs font-medium text-gray-500 animate-bounce">
                {timeOfRequest + "/60s"}
              </p>
            </div>
          </div>
        ) : (
          ""
        )}

          <div ref={messagesEndRef} />
          <div className="absolute bottom-[0.2rem] md:w-[52%] grid ">
            <input
              type="text"
              placeholder="Nhập câu hỏi tại đây..."
              // className="mr-1 shadow-xl border-2 focus:outline-none px-2 rounded-2xl input-primary col-start-1 md:col-end-12 col-end-11 "
              className="mr-1 shadow-lg border-2 focus:outline-none px-2 rounded-2xl input-primary col-start-1 md:col-end-12 col-end-11 focus:ring-1 focus:ring-blue-500"
              onChange={onChangeHandler}
              onKeyDown={handleKeyDown}
              disabled={isGen}
              value={promptInput}
            />

            <button
              disabled={isGen}
              onClick={() => SendMessageChat()}
              className={
                " drop-shadow-md md:col-start-12 rounded-2xl col-start-11 col-end-12 md:col-end-13 btn btn-active btn-primary btn-square bg-gradient-to-tl from-transparent via-blue-600 to-indigo-500"
              }
            >
              <svg
                stroke="currentColor"
                fill="none"
                strokeWidth="2"
                viewBox="0 0 24 24"
                color="white"
                height="15px"
                width="15px"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
            <p className=" text-xs col-start-1 col-end-12 text-justify p-1">
              <b>Lưu ý: </b>Mô hình có thể đưa ra câu trả lời không chính xác ở
              một số trường hợp, vì vậy hãy luôn kiểm chứng thông tin bạn nhé!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ChatBot;
