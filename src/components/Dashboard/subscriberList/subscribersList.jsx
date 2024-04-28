import { fetch } from "../../../pages/request";
import { useEffect, useState } from "react";
import { CgArrowDown } from "react-icons/cg";
import { HiMiniTrash } from "react-icons/hi2";
import Pagination from "../Pagination";
import axios from "axios";
import { BASE_URL } from "../../../pages/request";

const Subscribers = () => {
  const [retrievedSubscriberData, setRetrievedSubscriberData] = useState([]);
  const [notificationMessages, setNotificationMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [postPerPage, setPostPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    fetch(
      "subscriber/read",
      setRetrievedSubscriberData,
      setLoading,
      signal,
      setMessage
    );

    return () => {
      controller.abort();
    };
  }, []);

  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentSubscribersList = retrievedSubscriberData.slice(
    firstPostIndex,
    lastPostIndex
  );
  const currentNotificationMessages = notificationMessages.slice(
    firstPostIndex,
    lastPostIndex
  );

  const [sendMail, setSendMail] = useState(false);
  const [viewMessages, setViewMessages] = useState(false);
  const [subscriberList, setSubscriberList] = useState(true);

  const [mailContent, setMailContent] = useState({ subject: "", message: "" });

  const handleSendMail = () => {
    setSendMail(true);
    setViewMessages(false);
    setSubscriberList(false);
  };

  const handleViewMessages = () => {
    setViewMessages(true);
    setSendMail(false);
    setSubscriberList(false);
  };

  const handleSubscribersList = () => {
    setSubscriberList(true);
    setViewMessages(false);
    setSendMail(false);
  };

  const cancel = () => {
    setSendMail(false);
    setViewMessages(false);
    setSubscriberList(true);
  };

  const mailContentValues = (e) => {
    const { name, value } = e.target;
    setMailContent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitMail = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${BASE_URL}/subscriber/notify`,
        mailContent
      );
      setMessage(response.data.message);
      window.alert(response.data.message);
      window.location.reload();
    } catch (error) {
      setMessage(error.response.data.message);
      window.alert(error.response.data.message);
    }
  };

  return (
    <section>
      {/* buttons */}
      <div className="p-3 flex justify-between">
        {sendMail ? null : (
          <div
            role="button"
            onClick={handleSendMail}
            className={
              "border border-gray-50 bg-teal-500 w-56 text-white font-medium rounded-md p-3 text-center"
            }
          >
            <p>Send Mail to Subscribers</p>
          </div>
        )}

        {sendMail ? (
          <div
            role="button"
            onClick={cancel}
            className={
              "border border-gray-50 bg-red-400 w-20 text-white font-medium rounded-md p-3 text-center"
            }
          >
            <p>Cancel</p>
          </div>
        ) : null}

        {viewMessages ? (
          <div
            role="button"
            onClick={handleSubscribersList}
            className={
              sendMail
                ? "hidden"
                : "border border-gray-50 bg-green-500 w-56 text-white font-medium rounded-md p-3"
            }
          >
            <p className="text-center">View Subscribers</p>
          </div>
        ) : (
          <div
            role="button"
            onClick={handleViewMessages}
            className={
              sendMail
                ? "hidden"
                : "border border-gray-50 bg-blue-500 w-56 text-white font-medium rounded-md p-3"
            }
          >
            <p className="text-center">View Sent Messages</p>
          </div>
        )}
      </div>

      {/* mail */}
      {sendMail && (
        <div className=" p-3">
          <div className=" w-full m-auto p-2 mt-2 border border-gray-200 rounded-md ">
            <form onSubmit={submitMail} className="flex flex-col gap-4">
              <input
                type="text"
                name="subject"
                value={mailContent.subject}
                onChange={mailContentValues}
                className="h-14 p-2 bg-gray-50 rounded-md focus:bg-white"
                placeholder="Subject"
              />
              <hr></hr>
              <textarea
                name="message"
                value={mailContent.message}
                onChange={mailContentValues}
                className="h-64 p-2 bg-gray-50 rounded-md focus:bg-white"
                placeholder="Message"
              />

              <button
                type="submit"
                className="bg-teal-600 hover:bg-teal-500 p-3 rounded-md text-white font-medium"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      )}

      {/* subscribers list */}
      {subscriberList && (
        <div className="p-3">
          <div className=" border border-gray-200 rounded-md">
            <table className=" min-w-full divide-y divide-gray-200">
              <thead className=" bg-gray-50">
                <tr>
                  <th className="px-2 md:px-4 py-3 text-left text-sm font-medium flex gap-1">
                    Subscribers <CgArrowDown className="mt-1" />
                  </th>
                  <th className="px-2 md:px-4 py-3 text-left text-sm font-medium"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {retrievedSubscriberData.length === 0 ? (
                  <tr className=" flex justify-center p-3">
                    <td>No Data Available</td>
                  </tr>
                ) : (
                  currentSubscribersList.map((data) => (
                    <tr key={data.id} className=" hover:bg-gray-50">
                      <td className="px-2 md:px-4 py-4 text-left text-xs font-medium">
                        {data.email}
                      </td>
                      <td className="flex flex-col md:flex md:flex-row gap-2 py-2 md:py-4 text-left text-md font-medium">
                        <div
                          onClick={() =>
                            Delete(data.id, "scholarship", "Scholarship")
                          }
                          className=" hover:bg-red-300 cursor-pointer p-1 md:p-2 rounded-md"
                        >
                          <HiMiniTrash />
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <Pagination
            totalPosts={retrievedSubscriberData.length}
            postPerPage={postPerPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      )}

      {/* Sent messages */}
      {viewMessages && (
        <div className="p-2">
          <div className=" border border-gray-200 rounded-md">
            <table className=" min-w-full divide-y divide-gray-200">
              <thead className=" bg-gray-50">
                <tr>
                  <th className="px-2 md:px-4 py-3 text-left text-sm font-medium">
                    Subject
                  </th>
                  <th className="px-2 md:px-4 py-3 text-left text-sm font-medium">
                    Date Sent
                  </th>
                  <th className="px-2 md:px-4 py-3 text-left text-sm font-medium"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {notificationMessages.length === 0 ? (
                  <tr className=" flex justify-center p-3">
                    <td>No Data Available</td>
                  </tr>
                ) : (
                  currentNotificationMessages.map((data) => (
                    <tr key={data.id} className=" hover:bg-gray-50">
                      <td className="px-2 md:px-4 py-4 text-left text-xs font-medium">
                        {data.subject}
                      </td>
                      <td className="px-2 md:px-4 py-4 text-left text-xs font-medium">
                        {data.datecreated}
                      </td>
                      <td className="flex flex-col md:flex md:flex-row gap-2 py-2 md:py-4 text-left text-md font-medium">
                        <div
                          onClick={() =>
                            Delete(data.id, "scholarship", "Scholarship")
                          }
                          className=" hover:bg-red-300 cursor-pointer p-1 md:p-2 rounded-md"
                        >
                          <HiMiniTrash />
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <Pagination
            totalPosts={notificationMessages.length}
            postPerPage={postPerPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      )}
    </section>
  );
};

export default Subscribers;
