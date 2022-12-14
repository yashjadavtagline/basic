import { useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ReactQueryDevtools } from "react-query/devtools";

const fetchUser = ({ queryKey }) => {
  const id = queryKey[1];
  return axios.get(`http://localhost:4000/users/${id}`);
};
const InitialQuerydata = (queryKey) => {
  const { id } = useParams();

  const queryClient = useQueryClient();
  const { data, error, isFetching, isLoading, isError } = useQuery(
    ["user", id],
    fetchUser,
    {
      initialData: () => {
        const data = queryClient
          .getQueryData("users")
          ?.data?.find((user) => user.id === parseInt(id));
        if (data) {
          return {
            data: data,
          };
        } else {
          return undefined;
        }
      },
    }
  );console.log('data', data)
  return (
    <div>
      InitialQuerydata
      <div>
        <h2>{data?.data?.first_name}</h2>
        <h2>{data?.data?.email}</h2>
      </div>
      <ReactQueryDevtools initialIsOpen={true} position="bottom-right" />
    </div>
  );
};

export default InitialQuerydata;
