

//sample data
// {
//   "_id": {
//     "$oid": "6a0f769d2831527c23ae9088"
//   },
//   "ideaId": {
//     "$oid": "6a0f63842831527c23ae9077"
//   },
//   "userId": {
//     "$oid": "6b1f63842831527c23ae9001"
//   },
//   "comment": "Love the drone delivery concept!",
//   "like": 10,
//   "time": "2026-05-22T03:20:00"
// }


export const AddComment = ({ ideaId }) => {
    return (
        <div>
            Comment form for idea {ideaId}
        </div>
    );
};
