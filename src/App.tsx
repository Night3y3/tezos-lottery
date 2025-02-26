import React, { useState, useEffect } from "react";

// Components
import Navbar from "./components/Navbar";
import { buyTicketOperation, endGameOperation } from "./utils/operation";
import { getStorage } from "./utils/tzkt";
import { useAppSelector } from "./redux/hooks";
import crypto from "crypto"

const App: React.FC = () => {
  // Players holding lottery tickets
  const [players, setPlayers] = useState<string[]>([]);
  const [tickets, setTickets] = useState<number>(3);
  const [loading, setLoading] = useState<boolean>(false);
  const account = useAppSelector((state) => state.account.account);

  // Set players and tickets remaining
  useEffect(() => {
    // TODO 9 - Fetch players and tickets remaining from storage
    const fetchData = async () => {
      const storage = await getStorage("KT1LFfPVU9VyAgr2JKgqZPYbFhv9VUf1VywT");

      setPlayers(Object.values(storage.players));
      setTickets(storage.tickets_available);
    };

    fetchData();
  }, [account, tickets, players]);

  // TODO 7.a - Complete onBuyTicket function
  const onBuyTicket = async () => {
    try {
      setLoading(true)
      await buyTicketOperation(crypto.randomBytes(32).toString("hex"))
      alert("Ticket bought successfully")

    } catch (error) {
      throw error
    }
    setLoading(false)
  };

  // TODO 11.a - Complete onEndGame function
  const onEndGame = async () => {
    try {
      setLoading(true)
      await endGameOperation()
      alert("game ended")

    } catch (error) {
      throw error
    }
    setLoading(false)
  };

  return (
    <div className="h-100">
      <Navbar />
      <div className="d-flex flex-column justify-content-center align-items-center h-100">
        {/* Ticket remaining display */}
        <div className="py-1">Tickets remaining: {tickets}</div>
        {/* Action Buttons */}
        {tickets > 0 ? (
          <button onClick={onBuyTicket} className="btn btn-primary btn-lg">
            {/* TODO 7.b - Call onBuyTicket on click */}
            {/* TODO 7.c - Show "loading..." when buying operation is pending */}
            {loading ? "loading..." : "Buy Ticket"}
          </button>
        ) : (
          <button onClick={onEndGame} className="btn btn-success btn-lg">
            {/* TODO 11.b - Call onEndGame on click */}
            {/* TODO 11.c - Show "loading..." when buying operation is pending */}
            {loading ? "loading..." : "End Game"}
          </button>
        )}
        {/* List of Players */}
        <div className="mt-2">
          {account && players.map((player, index) => (
            <div key={index}>
              <b>Ticket {index + 1}:</b> {player}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
