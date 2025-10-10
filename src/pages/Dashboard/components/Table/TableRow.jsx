import Badge from "./Badge";

export default function TableRow({ user, fields }) {
  return (
    <tr className="border-b bottom-border-color bg-hover-card">
      {fields.map((field, i) => {
        const value = user[field];

        if (field === "abonement") {
          return (
            <td key={i} className="p-3 flex items-center justify-center">
              <Badge
                value={value}
                color={user.blocked ? "blocked" : "yellow"}
              />
            </td>
          );
        }

        if (field === "services") {
          return (
            <td key={i} className="p-3">
              <div className="flex items-center justify-center -space-x-2">
                {value.map((s, j) => (
                  <Badge
                    key={j}
                    value={s.value}
                    color={s.color}
                    className={
                      j === 0
                        ? "relative z-50"
                        : j === 1
                        ? "relative z-40"
                        : j === 2
                        ? "relative z-30"
                        : "relative z-20"
                    }
                  />
                ))}
              </div>
            </td>
          );
        }

        if (field === "avatar") {
          return (
            <td key={i} className="p-3 flex items-center gap-3">
              <img
                src={value}
                alt={user.name}
                className="w-8 h-8 rounded-full object-cover"
              />
              <span>{user.name}</span>
            </td>
          );
        }

        if (field === "position") {
          return (
            <td key={i} className="p-3">
              <div className="flex justify-center items-center flex-col">
                <span className="font-medium">{user.position}</span>
                {user.course && (
                  <span className="text-sm mt-1 color-accent">{user.course}</span>
                )}
              </div>
            </td>
          );
        }


        if (field === "staffstatus") {
          return (
            <td
              key={i}
              className={`p-3 font-medium flex items-center justify-center ${
                value === "На работе" ? "color-accent" : "text-red-500"
              }`}
            >
              {value}
            </td>
          );
        }

        return (
          <td key={i} className="p-3">
            {value}
          </td>
        );
      })}
    </tr>
  );
}
