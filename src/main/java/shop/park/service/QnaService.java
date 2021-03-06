package shop.park.service;

import java.util.List;

import shop.park.model.Qna;

public interface QnaService {
	public List<Qna> adminSelectAllQna();
	public List<Qna> selectAllQna(String u_id);
	public List<Qna> searchByQnaTitle(String q_title);
	public List<Qna> selectByQnaReply(String q_reply);
	public Qna selectByQnaNo(long q_no);
	public void insertQna(Qna qna);
	public void updateQna(Qna qna);
	public void deleteQna(long q_no);
	public int updateQnaReply(Qna qna);
}
