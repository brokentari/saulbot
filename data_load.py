import sqlite3
import json
from datetime import datetime

timeframe = "2011-07"
sql_transaction = []

connection = sqlite3.connect("{}.db".format(timeframe))

c = connection.cursor()


def create_table():
    c.execute(
        """CREATE TABLE IF NOT EXISTS parent_reply(parent_id TEXT PRIMARY KEY, 
        comment_id TEXT UNIQUE, parent TEXT, comment TEXT, subreddit TEXT, unix INT, score INT)"""
    )


def find_existing_score(pid):
    try:
        sql = "SELECT score FROM parent_reply WHERE parent_id = '{}' LIMIT 1".format(
            pid
        )
        c.execute(sql)
        result = c.fetchone()
        if result != None:
            return result[0]
        else:
            return False

    except Exception as e:
        print("find_parent", e)
        return False


def format_data(data):
    data = (
        data.replace("\n", " newlinechar ")
        .replace("\r", " newlinechar ")
        .replace('""', "'")
    )
    return data


def find_parent(pid):
    try:
        sql = "SELECT comment FROM parent_reply WHERE comment_id = '{}' LIMIT 1".format(
            pid
        )
        c.execute(sql)
        result = c.fetchone()
        if result != None:
            return result[0]
        else:
            return False

    except Exception as e:
        print("find_parent", e)
        return False


def acceptable(data):
    if len(data.split(" ")) > 50 or len(data) < 1:
        return False
    elif len(data) > 1000:
        return False
    elif data == "[deleted]" or data == "[removed]":
        return False
    else:
        return True


def transaction_bldr(sql):
    global sql_transaction
    sql_transaction.append(sql)
    if len(sql_transaction) > 1000:
        c.execute("BEGIN TRANSACTION")
        for s in sql_transaction:
            try:
                c.execute(s)
            except:
                pass
        connection.commit()
        sql_transaction = []


def sql_insert(mode, commentid, parentid, comment, subreddit, time, score, parent=None):
    if mode == 0:
        try:
            sql = """UPDATE parent_reply (parent_id, comment_id, parent, comment, subreddit, unix, score) VALUES ("{}","{}","{}","{}","{}",{},{});""".format(
                parentid, commentid, parent, comment, subreddit, int(
                    time), score
            )
            transaction_bldr(sql)
        except Exception as e:
            print("s-UPDATE insertion", str(e))
    elif mode == 1:
        try:
            sql = """INSERT INTO parent_reply (parent_id, comment_id, parent, comment, subreddit, unix, score) VALUES ("{}","{}","{}","{}","{}",{},{});""".format(
                parentid, commentid, parent, comment, subreddit, int(
                    time), score
            )
            transaction_bldr(sql)
        except Exception as e:
            print("s-PARENT insertion", str(e))
    elif mode == 2:
        try:
            sql = """INSERT INTO parent_reply (parent_id, comment_id, comment, subreddit, unix, score) VALUES ("{}","{}","{}","{}",{},{});""".format(
                parentid, commentid, comment, subreddit, int(time), score
            )
            transaction_bldr(sql)
        except Exception as e:
            print("s-NO_PARENT insertion", str(e))


if __name__ == "__main__":
    create_table()
    row_counter = 0
    paired_rows = 0

    with open("RC_2016-01", buffering=1000) as f:
        for row in f:
            row_counter += 1
            row = json.loads(row)
            comment_id = row["link_id"]
            parent_id = row["parent_id"]
            body = format_data(row["body"])
            created_utc = row["created_utc"]
            score = row["score"]
            subreddit = row["subreddit"]
            parent_data = find_parent(parent_id)

            if score >= 2:
                if acceptable(body):
                    existing_comment_score = find_existing_score(parent_id)
                    if existing_comment_score:
                        if score > existing_comment_score:
                            ####
                            sql_insert(
                                0,
                                comment_id,
                                parent_id,
                                body,
                                subreddit,
                                created_utc,
                                score,
                                parent_data,
                            )

                    else:
                        if parent_data:
                            ####
                            sql_insert(
                                1,
                                comment_id,
                                parent_id,
                                body,
                                subreddit,
                                created_utc,
                                score,
                                parent_data,
                            )
                            paired_rows += 1
                        else:
                            ####
                            sql_insert(
                                2,
                                comment_id,
                                parent_id,
                                body,
                                subreddit,
                                created_utc,
                                score,
                            )
            if row_counter % 100000 == 0:
                print(
                    "Total rows read: {}, Paired rows: {}, Time: {}".format(
                        row_counter, paired_rows, str(datetime.now())
                    )
                )
