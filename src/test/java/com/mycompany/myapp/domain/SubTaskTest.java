package com.mycompany.myapp.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.mycompany.myapp.web.rest.TestUtil;

public class SubTaskTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SubTask.class);
        SubTask subTask1 = new SubTask();
        subTask1.setId(1L);
        SubTask subTask2 = new SubTask();
        subTask2.setId(subTask1.getId());
        assertThat(subTask1).isEqualTo(subTask2);
        subTask2.setId(2L);
        assertThat(subTask1).isNotEqualTo(subTask2);
        subTask1.setId(null);
        assertThat(subTask1).isNotEqualTo(subTask2);
    }
}
